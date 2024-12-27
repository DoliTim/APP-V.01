'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Brain, 
  Clock, 
  Music2, 
  PlayCircle, 
  BookOpen,
  Trophy,
  TrendingUp,
  ChevronRight
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/local-storage'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = getCurrentUser()
    if (userData) {
      setUser(userData)
    } else {
      router.push('/auth/signin')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}</h1>
          <p className="text-gray-400">Continue your frequency mastery journey</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Practice Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Practice Time
                </CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.totalPracticeTime} min</div>
                <p className="text-xs text-gray-400">+15 min today</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Frequencies Mastered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Frequencies Mastered
                </CardTitle>
                <Music2 className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.frequenciesMastered}</div>
                <p className="text-xs text-gray-400">Out of 12 total</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
                <Activity className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.currentStreak} days</div>
                <p className="text-xs text-gray-400">Keep it going!</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Brain State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Brain State
                </CardTitle>
                <Brain className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Alpha</div>
                <p className="text-xs text-gray-400">8-12 Hz</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Start Practice */}
          <Card className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-purple-500/20 hover:from-purple-600/50 hover:to-pink-600/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-purple-400" />
                </div>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quick Practice</h3>
              <p className="text-sm text-gray-400 mb-4">
                Continue your frequency practice with a quick session
              </p>
              <Link href="/practice">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Start Session
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Continue Course */}
          <Card className="bg-black/60 border-purple-500/20 hover:bg-black/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <Progress value={33} className="w-16 bg-purple-500/20" />
              </div>
              <h3 className="text-lg font-bold mb-2">Continue Learning</h3>
              <p className="text-sm text-gray-400 mb-4">
                Resume "Mastering Schumann Resonance"
              </p>
              <Link href="/courses">
                <Button className="w-full bg-purple-500/30 hover:bg-purple-500/40 text-white">
                  Continue Course
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-black/60 border-purple-500/20 hover:bg-black/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-sm text-purple-400">3 new</div>
              </div>
              <h3 className="text-lg font-bold mb-2">Achievements</h3>
              <p className="text-sm text-gray-400 mb-4">
                You've unlocked new milestones
              </p>
              <Link href="/achievements">
                <Button className="w-full bg-purple-500/30 hover:bg-purple-500/40 text-white">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}