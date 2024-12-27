import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Registration request body:', body)

    const { email, password, name } = body

    // Validate input
    if (!email || !password) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log('Password too short')
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user exists
    console.log('Checking for existing user...')
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('User already exists')
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const hashedPassword = await hash(password, 10)

    // Create user with default preferences
    console.log('Creating user...')
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        hashedPassword,
        preferences: {
          create: {
            volume: 50,
            notificationsEnabled: true,
            sessionDuration: 15,
            preferredFrequencies: [7.83]
          }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    console.log('User created successfully:', user)

    return NextResponse.json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.error('Registration error details:', error)
    
    // Check for specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong during registration. Please try again.' },
      { status: 500 }
    )
  }
} 