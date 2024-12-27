interface User {
  id: string
  username: string
  email: string
  password: string
  createdAt: string
  totalPracticeTime: number
  frequenciesMastered: number
  currentStreak: number
  lastPracticeDate: string | null
  preferences: {
    volume: number
    notifications: boolean
    sessionDuration: number
    preferredFrequencies: number[]
    darkMode: boolean
  }
  courses: {
    [courseId: string]: {
      progress: number
      completedLessons: string[]
      lastAccessedLesson: string
      startedAt: string
      lastAccessed: string
    }
  }
}

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function removeCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function createUser(username: string, password: string, email: string): User {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
  
  if (users.some(user => user.username === username)) {
    throw new Error('Username already taken')
  }

  if (users.some(user => user.email === email)) {
    throw new Error('Email already taken')
  }

  const newUser = {
    id: Math.random().toString(36).slice(2),
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
    totalPracticeTime: 0,
    frequenciesMastered: 0,
    currentStreak: 0,
    lastPracticeDate: null,
    preferences: {
      volume: 50,
      notifications: true,
      sessionDuration: 15,
      preferredFrequencies: [7.83],
      darkMode: true
    },
    courses: {}
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(newUser))
  setCookie('user', newUser.id, 30) // Set cookie for 30 days
  
  return newUser
}

export function signIn(username: string, password: string): User {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
  const user = users.find(u => u.username === username && u.password === password)
  
  if (!user) {
    throw new Error('Invalid username or password')
  }

  localStorage.setItem('currentUser', JSON.stringify(user))
  setCookie('user', user.id, 30) // Set cookie for 30 days
  return user
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export function signOut() {
  localStorage.removeItem('currentUser')
  removeCookie('user')
}

export function updateUserProgress(updates: Partial<User>) {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  const updatedUser = { ...currentUser, ...updates }
  
  // Update in users array
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    localStorage.setItem('users', JSON.stringify(users))
  }

  // Update current user
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  
  return updatedUser
}

export function updateCourseProgress(courseId: string, progress: number, lessonId: string) {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  const courseProgress = currentUser.courses[courseId] || {
    progress: 0,
    completedLessons: [],
    lastAccessedLesson: lessonId,
    startedAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString()
  }

  const updatedCourseProgress = {
    ...courseProgress,
    progress,
    lastAccessedLesson: lessonId,
    lastAccessed: new Date().toISOString(),
    completedLessons: progress === 100 
      ? [...courseProgress.completedLessons, lessonId]
      : courseProgress.completedLessons
  }

  return updateUserProgress({
    courses: {
      ...currentUser.courses,
      [courseId]: updatedCourseProgress
    }
  })
}

export function addPracticeTime(minutes: number) {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  const today = new Date().toDateString()
  const lastPractice = currentUser.lastPracticeDate
    ? new Date(currentUser.lastPracticeDate).toDateString()
    : null

  // If last practice was yesterday, increment streak
  // If last practice was before yesterday, reset streak
  // If no last practice, start streak
  const isConsecutive = lastPractice === new Date(Date.now() - 86400000).toDateString()
  
  return updateUserProgress({
    totalPracticeTime: currentUser.totalPracticeTime + minutes,
    currentStreak: isConsecutive ? currentUser.currentStreak + 1 : 1,
    lastPracticeDate: today
  })
}