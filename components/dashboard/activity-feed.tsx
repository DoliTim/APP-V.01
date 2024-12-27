'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Activity,
  Music2,
  BookOpen,
  Trophy,
  Brain,
  Clock,
  Star,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ActivityItem {
  id: string
  type: 'practice_session' | 'course_progress' | 'frequency_mastered' | 'achievement' | 'brain_state' | 'streak'
  message: string
  timestamp: string
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'practice_session':
      return <Clock className="h-4 w-4 text-purple-400" />
    case 'course_progress':
      return <BookOpen className="h-4 w-4 text-blue-400" />
    case 'frequency_mastered':
      return <Music2 className="h-4 w-4 text-green-400" />
    case 'achievement':
      return <Trophy className="h-4 w-4 text-yellow-400" />
    case 'brain_state':
      return <Brain className="h-4 w-4 text-pink-400" />
    case 'streak':
      return <Zap className="h-4 w-4 text-orange-400" />
    default:
      return <Activity className="h-4 w-4 text-gray-400" />
  }
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'practice_session',
    message: 'Completed a 15-minute practice session',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'frequency_mastered',
    message: 'Mastered the 7.83Hz Schumann Resonance',
    timestamp: '1 hour ago'
  },
  {
    id: '3',
    type: 'course_progress',
    message: 'Completed Chapter 2 of Frequency Fundamentals',
    timestamp: '3 hours ago'
  },
  {
    id: '4',
    type: 'achievement',
    message: 'Earned "Frequency Explorer" badge',
    timestamp: '5 hours ago'
  },
  {
    id: '5',
    type: 'brain_state',
    message: 'Achieved Alpha state for 10 minutes',
    timestamp: '1 day ago'
  },
  {
    id: '6',
    type: 'streak',
    message: 'Maintained a 7-day practice streak',
    timestamp: '1 day ago'
  }
]

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // In a real app, we would fetch this from an API
    setActivities(mockActivities)
  }, [])

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/20 border-purple-500/10">
              <div className="p-4 flex items-start space-x-4">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-200">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.timestamp}</p>
                </div>
                <Star className="h-4 w-4 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 