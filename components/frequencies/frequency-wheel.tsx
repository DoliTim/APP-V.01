'use client';

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Frequency {
  id: string
  name: string
  value: number
  category: string
  description: string
  color: string
}

const defaultFrequencies: Frequency[] = [
  {
    id: "1",
    name: "First Schumann",
    value: 7.83,
    category: "schumann",
    description: "Earth's primary resonance",
    color: "bg-blue-500"
  },
  {
    id: "2",
    name: "Second Schumann",
    value: 14.3,
    category: "schumann",
    description: "Second harmonic",
    color: "bg-green-500"
  },
  {
    id: "3",
    name: "Healing",
    value: 432,
    category: "healing",
    description: "Traditional healing",
    color: "bg-purple-500"
  },
  {
    id: "4",
    name: "Meditation",
    value: 8.5,
    category: "meditation",
    description: "Alpha waves",
    color: "bg-yellow-500"
  }
]

export interface FrequencyWheelProps {
  frequencies?: Frequency[]
}

export function FrequencyWheel({ frequencies = defaultFrequencies }: FrequencyWheelProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency | null>(null)

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        {frequencies.map((frequency, index) => {
          const angle = (index * 360) / frequencies.length
          const radius = "40%"
          
          return (
            <button
              key={frequency.id}
              className={cn(
                "absolute w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 flex items-center justify-center text-white font-medium",
                frequency.color,
                selectedFrequency?.id === frequency.id && "ring-4 ring-white"
              )}
              style={{
                left: `calc(50% + ${radius} * ${Math.cos((angle * Math.PI) / 180)})`,
                top: `calc(50% + ${radius} * ${Math.sin((angle * Math.PI) / 180)})`
              }}
              onClick={() => setSelectedFrequency(frequency)}
            >
              {frequency.value}Hz
            </button>
          )
        })}
      </div>

      {selectedFrequency && (
        <Card className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
          <CardContent className="p-4">
            <h3 className="font-semibold">{selectedFrequency.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedFrequency.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}