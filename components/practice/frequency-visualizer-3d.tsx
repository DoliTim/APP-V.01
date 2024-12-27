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

interface WaveProps {
  frequency: number
  color: string
  position: [number, number, number]
  rotation: [number, number, number]
  phase?: number
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
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.2}
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

function FrequencyOrb({ frequency, color }: { frequency: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const noiseTexture = useMemo(() => createNoiseTexture(), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const scale = 1 + Math.sin(time * frequency * 0.1) * 0.1
    meshRef.current.scale.set(scale, scale, scale)
    meshRef.current.rotation.y = time * 0.2
  })

  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={0.5}
    >
      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.5}
          roughness={0.2}
          distort={0.4}
          speed={frequency * 0.5}
          normalMap={noiseTexture}
          normalScale={new Vector2(0.5, 0.5)}
        >
          <GradientTexture
            stops={[0, 0.4, 0.6, 1]}
            colors={['#ffffff', color, color, '#000000']}
          />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  )
}

function Particles({ count = 100, color }: { count?: number, color: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { viewport, size } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    if (!mesh.current) return
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2
      const y = (Math.random() - 0.5) * viewport.height * 2
      const z = (Math.random() - 0.5) * 10
      
      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [count, viewport, dummy])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const time = clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      dummy.position.y = Math.sin(time + i) * 0.5
      dummy.rotation.y = time * 0.1 + i
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
        metalness={1}
        roughness={0}
        envMapIntensity={1}
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
  const mainColor = colorTheme.primary.split(' ')[1].replace('to-', '')
  
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75}
        />
        
        <Environment preset="studio" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {isPlaying && (
          <>
            <FrequencyOrb frequency={frequency} color={mainColor} />
            
            {/* Multiple waves with different orientations and phases */}
            {[...Array(12)].map((_, i) => (
              <Wave
                key={i}
                frequency={frequency}
                color={mainColor}
                position={[0, 0, 0]}
                rotation={[
                  (Math.PI * 2 * i) / 12,
                  Math.PI / 4,
                  0
                ]}
                phase={i * Math.PI / 6}
              />
            ))}

            <Particles count={200} color={mainColor} />

            <Center position={[0, 2, 0]}>
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
                  color={mainColor}
                  metalness={1}
                  roughness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0}
                  envMapIntensity={2}
                />
              </Text3D>
            </Center>
          </>
        )}

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration 
            offset={new Vector2(0.002, 0.002)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  )
} 