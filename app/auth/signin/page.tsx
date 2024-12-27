'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser, signIn } from "@/lib/auth/local-storage"

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      if (isSignUp) {
        await createUser(username, password)
      } else {
        await signIn(username, password)
      }
      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background/90 to-background/50">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <Card className="w-full max-w-md relative border-muted-foreground/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Welcome to The Schumann
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSignUp ? "Create your profile" : "Sign in to your profile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="border-muted-foreground/20"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="border-muted-foreground/20"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isSignUp ? "Create Profile" : "Sign In"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {isSignUp ? "Already have a profile?" : "Don't have a profile?"}{" "}
              <button 
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                  setUsername("")
                  setPassword("")
                }} 
                className="underline hover:text-primary"
              >
                {isSignUp ? "Sign in" : "Create one"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 