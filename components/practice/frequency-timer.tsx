'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { allFrequencies, frequencyCategories } from '@/lib/frequencies/data';
import { savePracticeSession } from '@/lib/practice/storage';
import { Badge } from '@/components/ui/badge';

export function FrequencyTimer() {
  const [duration, setDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(allFrequencies[0].id);
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
      const frequency = allFrequencies.find(f => f.id === selectedFrequency);
      
      if (frequency) {
        savePracticeSession({
          date: new Date().toISOString().split('T')[0],
          type: 'frequency',
          duration: sessionDuration,
          frequency: frequency.hz
        });
      }
      setSessionStartTime(null);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionStartTime, selectedFrequency]);

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

  const frequency = allFrequencies.find(f => f.id === selectedFrequency);
  const category = frequencyCategories.find(cat => 
    cat.frequencies.some(f => f.id === selectedFrequency)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Frequency</label>
        <Select value={selectedFrequency} onValueChange={setSelectedFrequency}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a frequency" />
          </SelectTrigger>
          <SelectContent>
            {frequencyCategories.map((category) => (
              <div key={category.id}>
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                  {category.name}
                </div>
                {category.frequencies.map((freq) => (
                  <SelectItem 
                    key={freq.id} 
                    value={freq.id}
                    className="flex items-center gap-2"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: freq.color }}
                    />
                    <span>{freq.name}</span>
                    <span className="ml-auto text-muted-foreground">
                      {freq.hz}Hz
                    </span>
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {frequency && (
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: `${frequency.color}10`,
            borderColor: `${frequency.color}40`
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold" style={{ color: frequency.color }}>
              {frequency.name}
            </h3>
            {category && (
              <Badge variant="secondary">
                {category.name}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{frequency.description}</p>
          <div className="flex flex-wrap gap-2">
            {frequency.benefits.map((benefit, index) => (
              <Badge 
                key={index}
                variant="outline"
                style={{ borderColor: `${frequency.color}40` }}
              >
                {benefit}
              </Badge>
            ))}
          </div>
          {frequency.chakra && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Aligns with {frequency.chakra} Chakra</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold">{formatTime(timeLeft)}</h2>
        <div className="flex gap-2">
          <Button 
            onClick={toggleTimer} 
            size="lg"
            style={{
              backgroundColor: frequency?.color,
              color: 'white'
            }}
          >
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
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>1 min</span>
          <span>60 min</span>
        </div>
      </div>
    </div>
  );
}