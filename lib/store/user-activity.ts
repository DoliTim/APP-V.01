import { getCurrentUser, updateUserProgress } from "@/lib/auth/local-storage"

export type ActivityType = 
  | 'practice_session'
  | 'course_progress'
  | 'frequency_explored'
  | 'achievement_unlocked'
  | 'streak_updated'
  | 'login'
  | 'course_started'
  | 'lesson_completed'
  | 'frequency_favorited'
  | 'profile_updated'
  | 'goal_completed'
  | 'milestone_reached'

interface Activity {
  id: string
  type: ActivityType
  timestamp: string
  details: Record<string, any>
}

interface UserActivity {
  activities: Activity[]
  lastUpdated: string
  streakDays: number
  totalPracticeMinutes: number
  completedLessons: string[]
  exploredFrequencies: number[]
  achievements: string[]
  favoriteFrequencies: number[]
  dailyGoals: {
    date: string
    targetMinutes: number
    completedMinutes: number
  }[]
  weeklyStats: {
    weekStart: string
    totalMinutes: number
    sessionsCompleted: number
    averageFrequency: number
  }[]
}

// Initialize or get existing activity data
function getUserActivity(): UserActivity {
  const user = getCurrentUser()
  if (!user) return {
    activities: [],
    lastUpdated: new Date().toISOString(),
    streakDays: 0,
    totalPracticeMinutes: 0,
    completedLessons: [],
    exploredFrequencies: [],
    achievements: [],
    favoriteFrequencies: [],
    dailyGoals: [],
    weeklyStats: []
  }

  const activityData = localStorage.getItem(`activity_${user.id}`)
  if (!activityData) {
    const initial: UserActivity = {
      activities: [],
      lastUpdated: new Date().toISOString(),
      streakDays: user.currentStreak || 0,
      totalPracticeMinutes: user.totalPracticeTime || 0,
      completedLessons: [],
      exploredFrequencies: [7.83], // Start with Schumann base frequency
      achievements: [],
      favoriteFrequencies: [],
      dailyGoals: [{
        date: new Date().toISOString().split('T')[0],
        targetMinutes: 30,
        completedMinutes: 0
      }],
      weeklyStats: []
    }
    localStorage.setItem(`activity_${user.id}`, JSON.stringify(initial))
    return initial
  }

  return JSON.parse(activityData)
}

// Save activity data
function saveActivity(activity: Activity) {
  const user = getCurrentUser()
  if (!user) return

  const currentData = getUserActivity()
  const updatedData = {
    ...currentData,
    activities: [activity, ...currentData.activities].slice(0, 100), // Keep last 100 activities
    lastUpdated: new Date().toISOString()
  }

  localStorage.setItem(`activity_${user.id}`, JSON.stringify(updatedData))
  updateUserProgress({
    totalPracticeTime: updatedData.totalPracticeMinutes,
    currentStreak: updatedData.streakDays
  })

  // Check for achievements based on activity
  checkAndUpdateAchievements(updatedData)
}

// Track practice session
export function trackPracticeSession(minutes: number, frequency: number) {
  const activity: Activity = {
    id: Math.random().toString(36).slice(2),
    type: 'practice_session',
    timestamp: new Date().toISOString(),
    details: { minutes, frequency }
  }

  const currentData = getUserActivity()
  const updatedData = {
    ...currentData,
    totalPracticeMinutes: currentData.totalPracticeMinutes + minutes,
    exploredFrequencies: Array.from(new Set([...currentData.exploredFrequencies, frequency]))
  }

  // Update daily goal
  const today = new Date().toISOString().split('T')[0]
  const dailyGoalIndex = updatedData.dailyGoals.findIndex(goal => goal.date === today)
  if (dailyGoalIndex >= 0) {
    updatedData.dailyGoals[dailyGoalIndex].completedMinutes += minutes
  } else {
    updatedData.dailyGoals.push({
      date: today,
      targetMinutes: 30,
      completedMinutes: minutes
    })
  }

  // Update weekly stats
  const weekStart = getWeekStart(new Date())
  const weekStatIndex = updatedData.weeklyStats.findIndex(stat => stat.weekStart === weekStart)
  if (weekStatIndex >= 0) {
    const stat = updatedData.weeklyStats[weekStatIndex]
    updatedData.weeklyStats[weekStatIndex] = {
      ...stat,
      totalMinutes: stat.totalMinutes + minutes,
      sessionsCompleted: stat.sessionsCompleted + 1,
      averageFrequency: (stat.averageFrequency * stat.sessionsCompleted + frequency) / (stat.sessionsCompleted + 1)
    }
  } else {
    updatedData.weeklyStats.push({
      weekStart,
      totalMinutes: minutes,
      sessionsCompleted: 1,
      averageFrequency: frequency
    })
  }

  localStorage.setItem(`activity_${getCurrentUser()?.id}`, JSON.stringify(updatedData))
  saveActivity(activity)
}

// Track course progress
export function trackCourseProgress(courseId: string, lessonId: string, progress: number) {
  const activity: Activity = {
    id: Math.random().toString(36).slice(2),
    type: 'course_progress',
    timestamp: new Date().toISOString(),
    details: { courseId, lessonId, progress }
  }

  const currentData = getUserActivity()
  if (!currentData.completedLessons.includes(lessonId) && progress === 100) {
    currentData.completedLessons.push(lessonId)
  }

  localStorage.setItem(`activity_${getCurrentUser()?.id}`, JSON.stringify(currentData))
  saveActivity(activity)
}

// Track frequency exploration
export function trackFrequencyExplored(frequency: number) {
  const activity: Activity = {
    id: Math.random().toString(36).slice(2),
    type: 'frequency_explored',
    timestamp: new Date().toISOString(),
    details: { frequency }
  }

  const currentData = getUserActivity()
  if (!currentData.exploredFrequencies.includes(frequency)) {
    currentData.exploredFrequencies.push(frequency)
  }

  localStorage.setItem(`activity_${getCurrentUser()?.id}`, JSON.stringify(currentData))
  saveActivity(activity)
}

// Track favorite frequency
export function trackFrequencyFavorited(frequency: number) {
  const activity: Activity = {
    id: Math.random().toString(36).slice(2),
    type: 'frequency_favorited',
    timestamp: new Date().toISOString(),
    details: { frequency }
  }

  const currentData = getUserActivity()
  if (!currentData.favoriteFrequencies.includes(frequency)) {
    currentData.favoriteFrequencies.push(frequency)
  }

  localStorage.setItem(`activity_${getCurrentUser()?.id}`, JSON.stringify(currentData))
  saveActivity(activity)
}

// Get recent activities
export function getRecentActivities(limit: number = 10): Activity[] {
  const { activities } = getUserActivity()
  return activities.slice(0, limit)
}

// Get activity stats
export function getActivityStats() {
  const data = getUserActivity()
  return {
    totalPracticeMinutes: data.totalPracticeMinutes,
    uniqueFrequencies: data.exploredFrequencies.length,
    completedLessons: data.completedLessons.length,
    achievements: data.achievements.length,
    streakDays: data.streakDays,
    favoriteFrequencies: data.favoriteFrequencies,
    dailyGoals: data.dailyGoals,
    weeklyStats: data.weeklyStats
  }
}

// Get week start date
function getWeekStart(date: Date): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d.toISOString().split('T')[0]
}

// Achievement checking
function checkAndUpdateAchievements(data: UserActivity) {
  const newAchievements: string[] = []

  // Practice milestones
  if (data.totalPracticeMinutes >= 60 && !data.achievements.includes('first_hour')) {
    newAchievements.push('first_hour')
  }
  if (data.totalPracticeMinutes >= 600 && !data.achievements.includes('practice_master')) {
    newAchievements.push('practice_master')
  }
  if (data.totalPracticeMinutes >= 1800 && !data.achievements.includes('meditation_master')) {
    newAchievements.push('meditation_master')
  }

  // Frequency exploration
  if (data.exploredFrequencies.length >= 5 && !data.achievements.includes('frequency_explorer')) {
    newAchievements.push('frequency_explorer')
  }
  if (data.exploredFrequencies.length >= 10 && !data.achievements.includes('frequency_master')) {
    newAchievements.push('frequency_master')
  }

  // Streak achievements
  if (data.streakDays >= 7 && !data.achievements.includes('week_streak')) {
    newAchievements.push('week_streak')
  }
  if (data.streakDays >= 30 && !data.achievements.includes('month_streak')) {
    newAchievements.push('month_streak')
  }

  // Course achievements
  if (data.completedLessons.length >= 5 && !data.achievements.includes('course_explorer')) {
    newAchievements.push('course_explorer')
  }
  if (data.completedLessons.length >= 10 && !data.achievements.includes('course_master')) {
    newAchievements.push('course_master')
  }

  if (newAchievements.length > 0) {
    const updatedData = {
      ...data,
      achievements: [...data.achievements, ...newAchievements]
    }
    localStorage.setItem(`activity_${getCurrentUser()?.id}`, JSON.stringify(updatedData))

    // Track each new achievement
    newAchievements.forEach(achievement => {
      const activity: Activity = {
        id: Math.random().toString(36).slice(2),
        type: 'achievement_unlocked',
        timestamp: new Date().toISOString(),
        details: { achievement }
      }
      saveActivity(activity)
    })
  }
} 