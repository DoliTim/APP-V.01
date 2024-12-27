'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityFeed } from "./activity-feed"
import { Button } from "@/components/ui/button"
import { Music, Brain, Book, Activity } from "lucide-react"
import Link from "next/link"

export function DashboardView() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-6">
        {/* Welcome Card */}
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Welcome to The Schumann
            </CardTitle>
            <CardDescription>
              Your personal frequency exploration and healing journey
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Quick Access Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/library">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Music className="h-6 w-6 text-purple-400" />
                  <span>Frequency Library</span>
                </Button>
              </Link>
              <Link href="/practice">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Brain className="h-6 w-6 text-purple-400" />
                  <span>Practice Session</span>
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Book className="h-6 w-6 text-purple-400" />
                  <span>Courses</span>
                </Button>
              </Link>
              <Link href="/achievements">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Activity className="h-6 w-6 text-purple-400" />
                  <span>Achievements</span>
                </Button>
              </Link>
            </div>

            {/* Activity Feed */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 