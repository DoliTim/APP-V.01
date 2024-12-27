'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { savePracticeSession } from '@/lib/practice/storage';

export function Timer() {
  const [duration, setDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && sessionStartTime) {
      setIsRunning(false);
      const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
      savePracticeSession({
        date: new Date().toISOString().split('T')[0],
        type: 'timer',
        duration: sessionDuration
      });
      setSessionStartTime(null);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionStartTime]);

  const toggleTimer = () => {
    if (!isRunning) {
      setSessionStartTime(new Date());
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setSessionStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold">{formatTime(timeLeft)}</h2>
        <div className="flex gap-2">
          <Button onClick={toggleTimer} size="lg">
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Duration (minutes)</label>
        <Slider
          value={[duration]}
          onValueChange={(value) => {
            setDuration(value[0]);
            setTimeLeft(value[0] * 60);
          }}
          min={1}
          max={60}
          step={1}
          disabled={isRunning}
        />
      </div>
    </div>
  );
}