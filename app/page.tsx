'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/local-storage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  return null
}