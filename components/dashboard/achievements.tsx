import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Clock, Zap, Activity, Book, Star, Crown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getActivityStats } from "@/lib/store/user-activity"

const ACHIEVEMENTS = [
  {
    id: 'first_hour',
    title: 'First Hour',
    description: 'Complete 60 minutes of practice',
    icon: Clock,
    requirement: 60,
    type: 'minutes'
  },
  {
    id: 'practice_master',
    title: 'Practice Master',
    description: 'Complete 600 minutes of practice',
    icon: Clock,
    requirement: 600,
    type: 'minutes'
  },
  {
    id: 'meditation_master',
    title: 'Meditation Master',
    description: 'Complete 1800 minutes of practice',
    icon: Crown,
    requirement: 1800,
    type: 'minutes'
  },
  {
    id: 'frequency_explorer',
    title: 'Frequency Explorer',
    description: 'Explore 5 different frequencies',
    icon: Zap,
    requirement: 5,
    type: 'frequencies'
  },
  {
    id: 'frequency_master',
    title: 'Frequency Master',
    description: 'Explore 10 different frequencies',
    icon: Star,
    requirement: 10,
    type: 'frequencies'
  },
  {
    id: 'week_streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day practice streak',
    icon: Activity,
    requirement: 7,
    type: 'streak'
  },
  {
    id: 'month_streak',
    title: 'Monthly Master',
    description: 'Maintain a 30-day practice streak',
    icon: Crown,
    requirement: 30,
    type: 'streak'
  },
  {
    id: 'course_explorer',
    title: 'Course Explorer',
    description: 'Complete 5 lessons',
    icon: Book,
    requirement: 5,
    type: 'lessons'
  },
  {
    id: 'course_master',
    title: 'Course Master',
    description: 'Complete 10 lessons',
    icon: Crown,
    requirement: 10,
    type: 'lessons'
  }
]

export function Achievements() {
  const stats = getActivityStats()

  function getProgress(achievement: typeof ACHIEVEMENTS[0]) {
    switch (achievement.type) {
      case 'minutes':
        return Math.min(100, (stats.totalPracticeMinutes / achievement.requirement) * 100)
      case 'frequencies':
        return Math.min(100, (stats.uniqueFrequencies / achievement.requirement) * 100)
      case 'streak':
        return Math.min(100, (stats.streakDays / achievement.requirement) * 100)
      case 'lessons':
        return Math.min(100, (stats.completedLessons / achievement.requirement) * 100)
      default:
        return 0
    }
  }

  return (
    <Card className="border-muted-foreground/20 bg-background/95">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Track your milestones</CardDescription>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
            <Trophy className="h-5 w-5 text-purple-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {ACHIEVEMENTS.map(achievement => {
            const progress = getProgress(achievement)
            const Icon = achievement.icon
            const isCompleted = progress === 100
            return (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isCompleted ? 'bg-purple-500' : 'bg-purple-500/10'
                  } mr-3`}>
                    <Icon className={`h-4 w-4 ${
                      isCompleted ? 'text-white' : 'text-purple-500'
                    }`} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {achievement.title}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={progress} 
                  className="h-1"
                  indicatorClassName={`${
                    isCompleted 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 