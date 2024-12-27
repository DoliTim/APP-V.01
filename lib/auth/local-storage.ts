export interface User {
  id: string
  name?: string
  email?: string
  totalPracticeTime: number
  lastPracticeDate?: string
  practiceStats: {
    achievements: Achievement[]
    streaks: {
      current: number
      longest: number
    }
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
}

const STORAGE_KEY = 'app_user'

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const newUser: User = {
      id: `user_${Date.now()}`,
      totalPracticeTime: 0,
      practiceStats: {
        achievements: [],
        streaks: {
          current: 0,
          longest: 0
        }
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return newUser
  }
  
  return JSON.parse(stored)
}

export function updateUserProgress(update: Partial<User>) {
  const current = getCurrentUser()
  if (!current) return

  const updated = {
    ...current,
    ...update,
    practiceStats: {
      ...current.practiceStats,
      ...(update.practiceStats || {})
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function clearUserData() {
  localStorage.removeItem(STORAGE_KEY)
}