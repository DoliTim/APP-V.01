import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CourseProgress {
  courseId: string
  progress: number
  completedLessons: string[]
  lastAccessedLesson: string
  startedAt: string
  lastAccessed: string
}

interface UserPreferences {
  volume: number
  notificationsEnabled: boolean
  sessionDuration: number
  preferredFrequencies: number[]
}

interface UserProgress {
  courses: Record<string, CourseProgress>
  preferences: UserPreferences
  totalPracticeTime: number
  frequenciesMastered: number
  currentStreak: number
  lastPracticeDate: string | null
}

interface UserProgressStore extends UserProgress {
  updateCourseProgress: (courseId: string, lessonId: string, progress: number) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  addPracticeTime: (minutes: number) => void
  incrementFrequenciesMastered: () => void
  updateStreak: () => void
}

const initialPreferences: UserPreferences = {
  volume: 50,
  notificationsEnabled: true,
  sessionDuration: 15,
  preferredFrequencies: [7.83]
}

export const useUserProgress = create<UserProgressStore>()(
  persist(
    (set) => ({
      courses: {},
      preferences: initialPreferences,
      totalPracticeTime: 0,
      frequenciesMastered: 0,
      currentStreak: 0,
      lastPracticeDate: null,

      updateCourseProgress: (courseId, lessonId, progress) =>
        set((state) => {
          const courseProgress = state.courses[courseId] || {
            courseId,
            progress: 0,
            completedLessons: [],
            lastAccessedLesson: lessonId,
            startedAt: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
          }

          return {
            courses: {
              ...state.courses,
              [courseId]: {
                ...courseProgress,
                progress,
                lastAccessedLesson: lessonId,
                completedLessons: progress === 100 
                  ? [...courseProgress.completedLessons, lessonId]
                  : courseProgress.completedLessons,
                lastAccessed: new Date().toISOString(),
              },
            },
          }
        }),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      addPracticeTime: (minutes) =>
        set((state) => ({
          totalPracticeTime: state.totalPracticeTime + minutes,
        })),

      incrementFrequenciesMastered: () =>
        set((state) => ({
          frequenciesMastered: state.frequenciesMastered + 1,
        })),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString()
          const lastPractice = state.lastPracticeDate
            ? new Date(state.lastPracticeDate).toDateString()
            : null

          // If last practice was yesterday, increment streak
          // If last practice was before yesterday, reset streak
          // If no last practice, start streak
          const isConsecutive = lastPractice === new Date(Date.now() - 86400000).toDateString()
          
          return {
            currentStreak: isConsecutive ? state.currentStreak + 1 : 1,
            lastPracticeDate: today,
          }
        }),
    }),
    {
      name: 'user-progress',
    }
  )
)