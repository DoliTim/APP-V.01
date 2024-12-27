'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy,
  Star,
  Timer,
  Zap,
  Brain,
  Music2,
  Medal,
  Target
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/local-storage'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  progress: number
  total: number
  completed: boolean
  category: 'practice' | 'frequency' | 'streak' | 'mastery'
  reward: string
  date?: string
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Frequency Explorer',
    description: 'Practice with 5 different frequencies',
    icon: Music2,
    progress: 3,
    total: 5,
    completed: false,
    category: 'frequency',
    reward: 'New frequency presets unlocked'
  },
  {
    id: '2',
    title: 'Dedicated Practitioner',
    description: 'Complete 10 practice sessions',
    icon: Timer,
    progress: 7,
    total: 10,
    completed: false,
    category: 'practice',
    reward: 'Advanced visualization tools'
  },
  {
    id: '3',
    title: 'Resonance Master',
    description: 'Achieve perfect resonance with Schumann frequency',
    icon: Zap,
    progress: 100,
    total: 100,
    completed: true,
    category: 'mastery',
    reward: 'Custom frequency mixer',
    date: '2024-02-15'
  },
  {
    id: '4',
    title: 'Brain Wave Adept',
    description: 'Maintain Alpha state for 30 minutes',
    icon: Brain,
    progress: 25,
    total: 30,
    completed: false,
    category: 'mastery',
    reward: 'Brain state analysis tools'
  },
  {
    id: '5',
    title: 'Consistency Champion',
    description: 'Maintain a 7-day practice streak',
    icon: Target,
    progress: 5,
    total: 7,
    completed: false,
    category: 'streak',
    reward: 'Special profile badge'
  },
  {
    id: '6',
    title: 'Sacred Geometry',
    description: 'Complete the Sacred Geometry course',
    icon: Star,
    progress: 100,
    total: 100,
    completed: true,
    category: 'mastery',
    reward: 'Advanced visualization patterns',
    date: '2024-02-10'
  }
]

export default function AchievementsPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = getCurrentUser()
    if (userData) {
      setUser(userData)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-gray-400">Track your progress and unlock rewards</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-black/60 border-purple-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Achievements</p>
                <p className="text-2xl font-bold">{achievements.filter(a => a.completed).length} / {achievements.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Medal className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Latest Achievement</p>
                <p className="text-lg font-bold">Resonance Master</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Points</p>
                <p className="text-2xl font-bold">1,250</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-black/60 border-purple-500/20 ${achievement.completed ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${achievement.completed ? 'bg-purple-500/20 text-purple-200' : 'bg-gray-500/20 text-gray-400'}`}
                    >
                      {achievement.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-purple-400">{achievement.progress}/{achievement.total}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.total) * 100} className="bg-purple-500/10" />
                  </div>

                  {achievement.completed && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-400">Reward</span>
                        <span className="text-gray-400">{achievement.date}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{achievement.reward}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 