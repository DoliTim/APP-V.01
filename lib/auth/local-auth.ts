interface User {
  id: string
  email: string
  name: string
  password: string
}

export function createAccount(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
  
  if (users.some(user => user.email === email)) {
    throw new Error('User already exists')
  }

  const newUser = {
    id: Math.random().toString(36).slice(2),
    email,
    name: email.split('@')[0],
    password
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  
  // Set current user
  const { password: _, ...userWithoutPassword } = newUser
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
  
  return userWithoutPassword
}

export function signIn(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Set current user
  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
  
  return userWithoutPassword
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export function signOut() {
  localStorage.removeItem('currentUser')
}