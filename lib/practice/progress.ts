import { getCurrentUser, updateUserProgress, Achievement } from '@/lib/auth/local-storage'

export interface PracticeSession {
  id: string
  date: string
  duration: number
  frequency: number
  presetId?: string
  guidedSessionId?: string
}

export interface PracticeStats {
  totalSessions: number
  totalMinutes: number
  longestStreak: number
  currentStreak: number
  frequenciesUsed: Set<number>
  presetsUsed: Set<string>
  guidedSessionsCompleted: Set<string>
}

const achievements: Achievement[] = [
  {
    id: 'first_session',
    name: 'First Step',
    description: 'Complete your first practice session',
    icon: '🌱',
    unlockedAt: ''
  },
  {
    id: 'dedication',
    name: 'Dedication',
    description: 'Practice for 7 days in a row',
    icon: '🔥',
    unlockedAt: ''
  },
  {
    id: 'explorer',
    name: 'Frequency Explorer',
    description: 'Try 10 different frequencies',
    icon: '🔍',
    unlockedAt: ''
  },
  {
    id: 'master',
    name: 'Practice Master',
    description: 'Complete 50 practice sessions',
    icon: '⭐',
    unlockedAt: ''
  },
  {
    id: 'guided_master',
    name: 'Guided Master',
    description: 'Complete all guided sessions',
    icon: '🎯',
    unlockedAt: ''
  },
  {
    id: 'long_session',
    name: 'Deep Dive',
    description: 'Complete a 60-minute session',
    icon: '🌊',
    unlockedAt: ''
  }
]

export function recordPracticeSession(session: PracticeSession) {
  const user = getCurrentUser()
  if (!user) return

  // Get existing sessions or initialize
  const sessions = JSON.parse(localStorage.getItem('practice_sessions') || '[]') as PracticeSession[]
  sessions.push(session)
  localStorage.setItem('practice_sessions', JSON.stringify(sessions))

  // Calculate stats
  const stats = calculateStats(sessions)
  
  // Check for new achievements
  const newAchievements = checkNewAchievements(stats, user.practiceStats.achievements)
  
  // Update user progress
  updateUserProgress({
    totalPracticeTime: stats.totalMinutes,
    lastPracticeDate: session.date,
    practiceStats: {
      achievements: [...user.practiceStats.achievements, ...newAchievements],
      streaks: {
        current: stats.currentStreak,
        longest: stats.longestStreak
      }
    }
  })

  return newAchievements
}

export function calculateStats(sessions: PracticeSession[]): PracticeStats {
  const stats: PracticeStats = {
    totalSessions: sessions.length,
    totalMinutes: sessions.reduce((acc, s) => acc + s.duration, 0),
    longestStreak: 0,
    currentStreak: 0,
    frequenciesUsed: new Set(sessions.map(s => s.frequency)),
    presetsUsed: new Set(sessions.filter(s => s.presetId).map(s => s.presetId!)),
    guidedSessionsCompleted: new Set(sessions.filter(s => s.guidedSessionId).map(s => s.guidedSessionId!))
  }

  // Calculate streaks
  let currentStreak = 0
  let longestStreak = 0
  let lastDate = new Date(0)

  sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  for (const session of sessions) {
    const sessionDate = new Date(session.date)
    const dayDiff = Math.floor((lastDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (dayDiff <= 1) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      currentStreak = 1
    }
    
    lastDate = sessionDate
  }

  stats.currentStreak = currentStreak
  stats.longestStreak = longestStreak

  return stats
}

export function checkNewAchievements(stats: PracticeStats, existingAchievements: Achievement[]): Achievement[] {
  const newAchievements: Achievement[] = []
  const existingIds = new Set(existingAchievements.map(a => a.id))

  // Check each achievement condition
  if (stats.totalSessions >= 1 && !existingIds.has('first_session')) {
    newAchievements.push({ ...achievements[0], unlockedAt: new Date().toISOString() })
  }

  if (stats.currentStreak >= 7 && !existingIds.has('dedication')) {
    newAchievements.push({ ...achievements[1], unlockedAt: new Date().toISOString() })
  }

  if (stats.frequenciesUsed.size >= 10 && !existingIds.has('explorer')) {
    newAchievements.push({ ...achievements[2], unlockedAt: new Date().toISOString() })
  }

  if (stats.totalSessions >= 50 && !existingIds.has('master')) {
    newAchievements.push({ ...achievements[3], unlockedAt: new Date().toISOString() })
  }

  if (stats.guidedSessionsCompleted.size >= 4 && !existingIds.has('guided_master')) {
    newAchievements.push({ ...achievements[4], unlockedAt: new Date().toISOString() })
  }

  const longestSession = Math.max(...Array.from(stats.frequenciesUsed))
  if (longestSession >= 60 && !existingIds.has('long_session')) {
    newAchievements.push({ ...achievements[5], unlockedAt: new Date().toISOString() })
  }

  return newAchievements
}

export function getPracticeHistory(): PracticeSession[] {
  return JSON.parse(localStorage.getItem('practice_sessions') || '[]')
}

export function getStats(): PracticeStats {
  const sessions = getPracticeHistory()
  return calculateStats(sessions)
} 