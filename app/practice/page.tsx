'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Play,
  Pause,
  Volume2,
  Music2,
  Brain,
  Timer,
  Settings2,
  Activity,
  Sparkles,
  Maximize2,
  Minimize2,
  Waves,
  Flame,
  Moon,
  Sun,
  Heart
} from 'lucide-react'
import { getCurrentUser, updateUserProgress } from '@/lib/auth/local-storage'
import { cn } from '@/lib/utils'
import { frequencies } from '@/lib/frequencies/data'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const FrequencyVisualizer3D = dynamic(
  () => import('@/components/practice/frequency-visualizer-3d'),
  { ssr: false }
)

const colorThemes = [
  {
    name: 'Cosmic Purple',
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-purple-900/20 to-pink-900/20',
    accent: 'purple-400',
    wave: 'via-purple-500',
  },
  {
    name: 'Ocean Blue',
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-blue-900/20 to-cyan-900/20',
    accent: 'blue-400',
    wave: 'via-blue-500',
  },
  {
    name: 'Forest Green',
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-green-900/20 to-emerald-900/20',
    accent: 'green-400',
    wave: 'via-green-500',
  },
  {
    name: 'Golden Sun',
    primary: 'from-yellow-500 to-orange-500',
    secondary: 'from-yellow-900/20 to-orange-900/20',
    accent: 'yellow-400',
    wave: 'via-yellow-500',
  },
  {
    name: 'Heart Chakra',
    primary: 'from-rose-500 to-red-500',
    secondary: 'from-rose-900/20 to-red-900/20',
    accent: 'rose-400',
    wave: 'via-rose-500',
  }
]

const guidedSessions = [
  {
    id: 'deep-meditation',
    name: 'Deep Meditation',
    duration: 15,
    icon: Moon,
    description: 'A guided journey into deep meditative states',
    frequencies: [7.83, 4.5, 3.5, 2.5],
    intervals: [5, 5, 3, 2]
  },
  {
    id: 'energy-boost',
    name: 'Energy Activation',
    duration: 10,
    icon: Flame,
    description: 'Energize your body and mind',
    frequencies: [10, 14.1, 20, 30],
    intervals: [3, 3, 2, 2]
  },
  {
    id: 'healing',
    name: 'Healing Journey',
    duration: 20,
    icon: Heart,
    description: 'Promote physical and emotional healing',
    frequencies: [285, 396, 417, 528],
    intervals: [5, 5, 5, 5]
  },
  {
    id: 'focus',
    name: 'Focus Enhancement',
    duration: 12,
    icon: Brain,
    description: 'Sharpen your mental clarity',
    frequencies: [7.83, 10, 12, 15],
    intervals: [3, 3, 3, 3]
  }
]

export default function PracticePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [frequency, setFrequency] = useState(7.83)
  const [duration, setDuration] = useState(15)
  const [visualize, setVisualize] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isProVersion, setIsProVersion] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [colorTheme, setColorTheme] = useState(colorThemes[0])
  const [activeSession, setActiveSession] = useState<any>(null)
  const [sessionStep, setSessionStep] = useState(0)
  const [isV2Pro, setIsV2Pro] = useState(true)
  const [v2OutputConfirmed, setV2OutputConfirmed] = useState(false)
  const [showV2Setup, setShowV2Setup] = useState(false)

  const categories = Array.from(new Set(frequencies.map(f => f.category)))

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1
          
          // Handle guided session progression
          if (activeSession) {
            const totalElapsed = newTime
            let stepTime = 0
            let currentStep = 0
            
            for (let i = 0; i < activeSession.intervals.length; i++) {
              stepTime += activeSession.intervals[i] * 60
              if (totalElapsed < stepTime) {
                if (currentStep !== sessionStep) {
                  setSessionStep(currentStep)
                  setFrequency(activeSession.frequencies[currentStep])
                }
                break
              }
              currentStep++
            }
          }

          if (newTime >= duration * 60) {
            setIsPlaying(false)
            setActiveSession(null)
            setSessionStep(0)
            const user = getCurrentUser()
            if (user) {
              updateUserProgress({
                totalPracticeTime: user.totalPracticeTime + duration,
                lastPracticeDate: new Date().toISOString()
              })
            }
            return 0
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, duration, activeSession, sessionStep])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startGuidedSession = (session: any) => {
    setActiveSession(session)
    setDuration(session.duration)
    setFrequency(session.frequencies[0])
    setSessionStep(0)
    setIsPlaying(true)
  }

  const visualizer = (
    <div className={cn(
      "aspect-square rounded-lg bg-black/40 flex items-center justify-center relative overflow-hidden",
      isFullscreen && "fixed inset-0 z-50 aspect-auto rounded-none"
    )}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", colorTheme.secondary)} />
      
      {/* 3D Visualization */}
      <FrequencyVisualizer3D
        frequency={frequency}
        isPlaying={isPlaying}
        colorTheme={colorTheme}
      />

      {/* Fullscreen toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white/70 hover:text-white z-50"
        onClick={() => setIsFullscreen(!isFullscreen)}
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </Button>

      {/* Color theme selector (only in fullscreen) */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              className={cn(
                "w-8 h-8 rounded-full bg-gradient-to-r",
                theme.primary,
                colorTheme.name === theme.name && "ring-2 ring-white"
              )}
              onClick={() => setColorTheme(theme)}
            />
          ))}
        </div>
      )}

      {/* Session info overlay */}
      {activeSession && (
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 z-50">
          <div className="flex items-center gap-x-2">
            {activeSession.icon && <activeSession.icon className="h-4 w-4 text-white/70" />}
            <span className="text-white/90 font-medium">{activeSession.name}</span>
          </div>
          <div className="text-xs text-white/70 mt-1">
            Step {sessionStep + 1} of {activeSession.frequencies.length}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Universal Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center">
          <div className="flex-1" /> {/* Left spacer */}
          
          <Link 
            href="/landing" 
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                SCHUMANN
              </span>
              <span className="text-xs font-medium text-white/60">
                FREQUENCY HEALING
              </span>
            </div>
          </Link>

          <div className="flex-1" /> {/* Right spacer */}
        </div>
      </div>

      <div className="min-h-screen bg-black text-white p-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold mb-2">
              Frequency Practice {isProVersion && <span className="text-purple-400 text-xl">PRO</span>}
            </h1>
            <p className="text-gray-400">Tune into Earth's natural resonance</p>
          </motion.div>

          {/* Guided Practice Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <Waves className="h-5 w-5 text-purple-400" />
                  Guided Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guidedSessions.map((session) => {
                    const Icon = session.icon
                    return (
                      <Button
                        key={session.id}
                        variant="outline"
                        className={cn(
                          "flex flex-col items-start p-4 h-auto border-purple-500/20 hover:bg-purple-500/10",
                          activeSession?.id === session.id && "bg-purple-500/10"
                        )}
                        onClick={() => startGuidedSession(session)}
                        disabled={isPlaying && activeSession?.id !== session.id}
                      >
                        <div className="flex items-center gap-x-2 w-full">
                          <Icon className="h-4 w-4" />
                          <span className="font-semibold">{session.name}</span>
                          <span className="ml-auto text-sm text-purple-400">{session.duration}min</span>
                        </div>
                        <p className="text-xs text-left mt-2 text-gray-400">
                          {session.description}
                        </p>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Practice Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-black/40 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    Frequency Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {visualize && visualizer}
                </CardContent>
              </Card>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-black/40 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <Settings2 className="h-5 w-5 text-purple-400" />
                    Practice Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Practice Controls */}
                  <div className="space-y-6 p-6 bg-black/20 backdrop-blur-sm rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">Practice Controls</h3>
                        <p className="text-sm text-white/70">Adjust your practice settings</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="v2pro"
                          checked={isV2Pro}
                          onCheckedChange={setIsV2Pro}
                          className="data-[state=checked]:bg-gradient-to-r from-violet-600 to-indigo-600"
                        />
                        <Label htmlFor="v2pro" className="text-sm font-medium text-white">
                          V2 PRO ✨
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white">Frequency (Hz)</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={[frequency]}
                            onValueChange={([value]: number[]) => setFrequency(value)}
                            min={isV2Pro ? 0.1 : 7.83}
                            max={isV2Pro ? 999.99 : 14.3}
                            step={0.01}
                            className="flex-1"
                          />
                          <div className="w-20 text-right">
                            <input
                              type="number"
                              value={frequency}
                              onChange={(e) => setFrequency(Number(e.target.value))}
                              min={isV2Pro ? 0.1 : 7.83}
                              max={isV2Pro ? 999.99 : 14.3}
                              step={0.01}
                              className="w-full bg-black/20 border border-white/20 rounded px-2 py-1 text-white text-right"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Volume Control */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-x-2">
                          <Volume2 className="h-4 w-4 text-purple-400" />
                          Volume: {volume}%
                        </Label>
                        <Slider
                          value={[volume]}
                          onValueChange={([value]: number[]) => setVolume(value)}
                          min={0}
                          max={100}
                          className="bg-purple-500/10"
                        />
                      </div>

                      {/* Duration Control */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-x-2">
                          <Timer className="h-4 w-4 text-purple-400" />
                          Duration: {duration} minutes
                        </Label>
                        <Slider
                          value={[duration]}
                          onValueChange={([value]: number[]) => !activeSession && setDuration(value)}
                          min={5}
                          max={60}
                          step={5}
                          className="bg-purple-500/10"
                          disabled={!!activeSession}
                        />
                      </div>

                      {/* Visualization Toggle */}
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-x-2">
                          <Brain className="h-4 w-4 text-purple-400" />
                          Visual Entrainment
                        </Label>
                        <Switch
                          checked={visualize}
                          onCheckedChange={setVisualize}
                        />
                      </div>

                      {/* Safety Check for V2 Output */}
                      <div className="space-y-4">
                        {/* V2 Output Confirmation */}
                        {isV2Pro && !v2OutputConfirmed && !isPlaying && frequency !== 7.83 && (
                          <div className="p-3 bg-orange-500/20 rounded-lg space-y-2">
                            <div className="flex items-start gap-2">
                              <div className="h-5 w-5 mt-1 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">!</div>
                              <div className="flex-1">
                                <p className="text-sm text-orange-200">Safety Check Required</p>
                                <p className="text-xs text-orange-200/70 mt-1">
                                  Please confirm that you have connected your V2 PRO device to the frequency output before playing {frequency}Hz.
                                </p>
                              </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={v2OutputConfirmed}
                                onChange={(e) => setV2OutputConfirmed(e.target.checked)}
                                className="rounded border-orange-500/50 bg-orange-500/20 text-orange-500"
                              />
                              <span className="text-sm text-orange-200">I confirm my V2 PRO is properly connected</span>
                            </label>
                          </div>
                        )}

                        {/* V2 Setup Instructions */}
                        {showV2Setup && !isPlaying && (
                          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-black/90 border border-purple-500/20 rounded-xl max-w-md w-full p-6 space-y-4">
                              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-purple-400" />
                                V2 Setup Required
                              </h3>
                              
                              <div className="space-y-4 text-white/80">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">1</div>
                                  <p>Set your V2 device frequency to {frequency}Hz</p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">2</div>
                                  <p>Connect the output to your preferred method (headphones, speakers, etc.)</p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">3</div>
                                  <p>Ensure volume levels are set appropriately</p>
                                </div>
                              </div>

                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={() => {
                                  setShowV2Setup(false)
                                  setIsPlaying(true)
                                }}
                              >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Setup Complete - Start Practice
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Play/Pause Button */}
                        <Button
                          onClick={() => {
                            if (isPlaying) {
                              setIsPlaying(false)
                              setActiveSession(null)
                              setSessionStep(0)
                            } else {
                              setShowV2Setup(true) // Show setup instructions instead of playing immediately
                            }
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause ({formatTime(elapsedTime)} / {formatTime(duration * 60)})
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Practice
                            </>
                          )}
                        </Button>

                        {/* V2 PRO Status */}
                        {isV2Pro && (
                          <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between text-sm text-white/70">
                              <span>✨ V2 PRO Features Active</span>
                              <span>
                                {frequency === 7.83 
                                  ? "Using Standard 7.83Hz" 
                                  : "Full Range: 0.1Hz - 999.99Hz"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Frequency Presets */}
          {isProVersion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-black/40 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    Frequency Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Category Filter */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "border-purple-500/20",
                        selectedCategory === 'all' && "bg-purple-500/20"
                      )}
                      onClick={() => setSelectedCategory('all')}
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "border-purple-500/20",
                          selectedCategory === category && "bg-purple-500/20"
                        )}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    ))}
                  </div>

                  {/* Preset Grid */}
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {frequencies
                        .filter(f => selectedCategory === 'all' || f.category === selectedCategory)
                        .map((preset) => (
                          <Button
                            key={preset.id}
                            variant="outline"
                            className={cn(
                              "flex flex-col items-start p-4 h-auto border-purple-500/20 hover:bg-purple-500/10",
                              frequency === preset.value && "bg-purple-500/10"
                            )}
                            onClick={() => {
                              if (!activeSession) {
                                setFrequency(preset.value)
                                if (preset.practiceTime) {
                                  setDuration(preset.practiceTime)
                                }
                              }
                            }}
                            disabled={!!activeSession}
                          >
                            <div className="flex items-center gap-x-2 w-full">
                              <Music2 className="h-4 w-4" />
                              <span className="font-semibold">{preset.name}</span>
                              <span className="ml-auto text-sm text-purple-400">{preset.value}Hz</span>
                            </div>
                            <p className="text-xs text-left mt-2 text-gray-400 line-clamp-2">
                              {preset.description}
                            </p>
                          </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fullscreen Visualization Portal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {visualizer}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}