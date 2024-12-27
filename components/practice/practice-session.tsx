import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"
import { useState } from "react"

export function PracticeSession() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [progress, setProgress] = useState(0)

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Practice Session</CardTitle>
          <CardDescription>Current Frequency: 7.83 Hz (Schumann Resonance)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0:00</span>
              <span>5:00</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
            />
          </div>

          <div className="pt-6">
            <h3 className="font-semibold mb-2">Session Notes</h3>
            <p className="text-sm text-muted-foreground">
              The Schumann resonance is Earth's electromagnetic field frequency.
              It helps with grounding and alignment with Earth's natural rhythm.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 