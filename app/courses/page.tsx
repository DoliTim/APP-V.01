'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Brain,
  Heart,
  Zap,
  Music2
} from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth/local-storage'

interface Course {
  id: string
  title: string
  description: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  lessons: number
  icon: any
  progress?: number
  lastLesson?: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Schumann Resonance Mastery',
    description: 'Learn to harness the Earth\'s natural frequency for healing and transformation.',
    duration: 180,
    level: 'beginner',
    lessons: 12,
    icon: Zap
  },
  {
    id: '2',
    title: 'Brain Wave Optimization',
    description: 'Master different brain states for enhanced performance and well-being.',
    duration: 240,
    level: 'intermediate',
    lessons: 16,
    icon: Brain
  },
  {
    id: '3',
    title: 'Heart Coherence Training',
    description: 'Align your heart and mind for emotional balance and healing.',
    duration: 150,
    level: 'beginner',
    lessons: 10,
    icon: Heart
  },
  {
    id: '4',
    title: 'Advanced Frequency Healing',
    description: 'Explore advanced healing frequencies and their applications.',
    duration: 300,
    level: 'advanced',
    lessons: 20,
    icon: Music2
  }
]

const levelColors = {
  beginner: 'text-green-400',
  intermediate: 'text-blue-400',
  advanced: 'text-purple-400'
}

export default function CoursesPage() {
  const [user] = useState(getCurrentUser())

  const coursesWithProgress = courses.map(course => ({
    ...course,
    progress: user?.courses?.[course.id]?.progress || 0,
    lastLesson: user?.courses?.[course.id]?.lastAccessedLesson
  }))

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Sacred Frequency Courses</h1>
          <p className="text-gray-400">Master the art of frequency healing</p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coursesWithProgress.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-purple-500/20 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-x-2">
                        <course.icon className="h-5 w-5 text-purple-400" />
                        {course.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10">
                          {course.lessons} Lessons
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`border-purple-500/20 bg-purple-500/10 capitalize ${levelColors[course.level]}`}
                        >
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    <Star className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">{course.description}</p>
                  
                  <div className="flex items-center gap-x-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} minutes</span>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="bg-purple-500/10" />
                      {course.lastLesson && (
                        <p className="text-xs text-gray-400">
                          Last completed: Lesson {course.lastLesson}
                        </p>
                      )}
                    </div>
                  )}

                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full bg-purple-500/10 hover:bg-purple-500/20">
                      {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl font-bold">Ready to Begin Your Journey?</h2>
                  <p className="text-gray-400">
                    Start with our comprehensive beginner course and master the fundamentals of frequency healing.
                  </p>
                  <Link href="/courses/1">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Start Free Course
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 