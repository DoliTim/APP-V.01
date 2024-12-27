import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise
} from '@react-three/postprocessing'
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  GradientTexture,
  PerspectiveCamera,
  Text3D,
  Center,
  Environment
} from '@react-three/drei'
import * as THREE from 'three'
import { Vector2, Vector3, DataTexture, RGBAFormat, FloatType } from 'three'
import { getFrequencyColorTheme } from '@/lib/frequencies/colors'

interface WaveProps {
  frequency: number
  color: string
  position: [number, number, number]
  rotation: [number, number, number]
  phase?: number
}

function lerpColor(color1: string, color2: string, t: number): string {
  const c1 = new THREE.Color(color1)
  const c2 = new THREE.Color(color2)
  const c = new THREE.Color()
  c.r = c1.r + (c2.r - c1.r) * t
  c.g = c1.g + (c2.g - c1.g) * t
  c.b = c1.b + (c2.b - c1.b) * t
  return `#${c.getHexString()}`
}

function Wave({ frequency, color, position, rotation, phase = 0 }: WaveProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i <= 50; i++) {
      const x = (i - 25) * 0.2
      points.push(new Vector3(x, 0, 0))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const positions = meshRef.current.geometry.attributes.position
    const point = new Vector3()
    
    for (let i = 0; i < positions.count; i++) {
      const t = i / positions.count
      curve.getPoint(t, point)
      const x = point.x
      const y = Math.sin(time * 2 + x * frequency * 0.2 + phase) * 0.5
      positions.setY(i, y)
    }
    positions.needsUpdate = true

    // Dynamic color based on wave height
    const material = meshRef.current.material as THREE.MeshPhysicalMaterial
    const colorT = (Math.sin(time * 2 + phase) + 1) * 0.5
    material.color.set(lerpColor(color, '#ffffff', colorT * 0.3))
    material.emissive.set(lerpColor('#000000', color, colorT * 0.5))
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.8}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
        toneMapped={false}
      />
    </mesh>
  )
}

function createNoiseTexture() {
  const size = 256
  const data = new Float32Array(size * size * 4)
  
  for (let i = 0; i < size * size; i++) {
    const stride = i * 4
    data[stride] = Math.random() * 2.0 - 1.0
    data[stride + 1] = Math.random() * 2.0 - 1.0
    data[stride + 2] = Math.random() * 2.0 - 1.0
    data[stride + 3] = 1
  }
  
  const texture = new DataTexture(data, size, size, RGBAFormat, FloatType)
  texture.needsUpdate = true
  return texture
}

// Custom type for MeshDistortMaterial since it's not in Three.js types
declare module '@react-three/drei' {
  export interface MeshDistortMaterialProps {
    color?: THREE.ColorRepresentation
    envMapIntensity?: number
    clearcoat?: number
    clearcoatRoughness?: number
    metalness?: number
    roughness?: number
    distort?: number
    speed?: number
    normalMap?: THREE.Texture
    normalScale?: THREE.Vector2
    toneMapped?: boolean
  }
}

function FrequencyOrb({ frequency, color }: { frequency: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const noiseTexture = useMemo(() => createNoiseTexture(), [])
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return
    const time = clock.getElapsedTime()
    const scale = 1 + Math.sin(time * frequency * 0.1) * 0.1
    meshRef.current.scale.set(scale, scale, scale)
    meshRef.current.rotation.y = time * 0.2

    // Glow effect
    const glowScale = 1.2 + Math.sin(time * frequency * 0.2) * 0.1
    glowRef.current.scale.set(glowScale, glowScale, glowScale)
    
    // Dynamic color
    const material = meshRef.current.material as THREE.MeshStandardMaterial
    if (material && 'color' in material) {
      const colorT = (Math.sin(time * frequency * 0.1) + 1) * 0.5
      material.color.set(lerpColor(color, '#ffffff', colorT * 0.2))
    }
  })

  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={0.5}
    >
      {/* Glow sphere */}
      <Sphere ref={glowRef} args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </Sphere>

      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.3}
          roughness={0.2}
          distort={0.4}
          speed={frequency * 0.5}
          normalMap={noiseTexture}
          normalScale={new Vector2(0.5, 0.5)}
          toneMapped={false}
        >
          <GradientTexture
            stops={[0, 0.2, 0.4, 0.6, 1]}
            colors={['#ffffff', color, color, color, '#000000']}
          />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  )
}

function Particles({ count = 100, color }: { count?: number, color: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { viewport } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const speeds = useMemo(() => new Float32Array(count).map(() => 0.5 + Math.random() * 2), [count])
  const scales = useMemo(() => new Float32Array(count).map(() => 0.3 + Math.random() * 0.7), [count])
  const offsets = useMemo(() => new Float32Array(count).map(() => Math.random() * Math.PI * 2), [count])

  useEffect(() => {
    if (!mesh.current) return
    
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 2
      const x = Math.cos(theta) * radius
      const y = (Math.random() - 0.5) * 4
      const z = Math.sin(theta) * radius
      
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(scales[i] * 0.1)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [count, viewport, dummy, scales])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const time = clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      const theta = ((i / count) * Math.PI * 2) + (time * speeds[i] * 0.2)
      const radius = 2 + Math.sin(time * speeds[i] + offsets[i]) * 0.5
      const x = Math.cos(theta) * radius
      const y = Math.sin(time * speeds[i] + offsets[i]) * 0.5 + Math.sin(offsets[i] * 10) * 0.5
      const z = Math.sin(theta) * radius
      
      dummy.position.set(x, y, z)
      dummy.rotation.y = time * speeds[i]
      dummy.scale.setScalar(scales[i] * (0.1 + Math.sin(time * speeds[i] + offsets[i]) * 0.05))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.6}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={2}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

interface FrequencyVisualizer3DProps {
  frequency: number
  isPlaying: boolean
  colorTheme: {
    primary: string
    secondary: string
    accent: string
  }
}

export default function FrequencyVisualizer3D({ 
  frequency,
  isPlaying,
  colorTheme
}: FrequencyVisualizer3DProps) {
  const freqTheme = useMemo(() => getFrequencyColorTheme(frequency), [frequency])
  
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75}
        />
        
        <Environment preset="warehouse" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {isPlaying && (
          <>
            <FrequencyOrb frequency={frequency} color={freqTheme.primary} />
            
            {/* Multiple waves with different orientations and phases */}
            {[...Array(12)].map((_, i) => (
              <Wave
                key={i}
                frequency={frequency}
                color={freqTheme.accent}
                position={[0, 0, 0]}
                rotation={[
                  (Math.PI * 2 * i) / 12,
                  Math.PI / 4,
                  0
                ]}
                phase={i * Math.PI / 6}
              />
            ))}

            <Particles count={200} color={freqTheme.primary} />

            <Center position={[0, 2, 0]}>
              <group>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={0.3}
                  height={0.1}
                  curveSegments={12}
                  bevelEnabled
                  bevelSize={0.01}
                  bevelThickness={0.01}
                >
                  {frequency.toFixed(2)} Hz
                  <meshPhysicalMaterial
                    color={freqTheme.primary}
                    metalness={0.7}
                    roughness={0.3}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    envMapIntensity={1.5}
                    toneMapped={false}
                  />
                </Text3D>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={0.15}
                  height={0.05}
                  curveSegments={8}
                  position={[0, -0.4, 0]}
                >
                  {freqTheme.name}
                  <meshPhysicalMaterial
                    color={freqTheme.accent}
                    metalness={0.7}
                    roughness={0.3}
                    envMapIntensity={1}
                    toneMapped={false}
                  />
                </Text3D>
              </group>
            </Center>
          </>
        )}

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration 
            offset={new Vector2(0.001, 0.001)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>

      {/* Frequency info overlay */}
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="font-medium text-white/90">{freqTheme.name}</div>
        <div className="text-white/70 mt-1">{freqTheme.description}</div>
      </div>
    </div>
  )
} 