'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';
import { savePracticeSession } from '@/lib/practice/storage';

interface FrequencySessionProps {
  deviceType: 'v1' | 'v2' | null;
}

export function FrequencySession({ deviceType }: FrequencySessionProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentFrequency, setCurrentFrequency] = useState('7.83');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    savePracticeSession({
      date: new Date().toISOString().split('T')[0],
      type: 'frequency',
      duration: sessionTime,
      frequency: parseFloat(currentFrequency)
    });
    setIsRunning(false);
    setSessionTime(0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">{formatTime(sessionTime)}</h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline">{currentFrequency} Hz</Badge>
          <Badge variant="secondary">{deviceType === 'v2' ? 'V2 Pro' : 'V1'}</Badge>
        </div>
      </div>

      <Progress value={(sessionTime % 3600) / 36} />

      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setIsRunning(false);
            setSessionTime(0);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          size="lg"
          variant="secondary"
          onClick={handleSave}
          disabled={sessionTime === 0}
        >
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}