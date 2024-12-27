'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getLastNDays } from '@/lib/practice/storage';
import { PracticeDay } from '@/lib/practice/types';
import { format } from 'date-fns';
import { allFrequencies } from '@/lib/frequencies/data';

export function PracticeCalendar() {
  const [practiceData, setPracticeData] = useState<PracticeDay[]>([]);

  useEffect(() => {
    setPracticeData(getLastNDays(365));
  }, []);

  const getFrequencyColor = (frequency: number) => {
    const freq = allFrequencies.find(f => f.hz === frequency);
    return freq?.color || '#4CAF50';
  };

  const getIntensity = (sessions: PracticeDay['sessions']) => {
    if (sessions.length === 0) return 'bg-secondary';
    if (sessions.length <= 1) return 'opacity-40';
    if (sessions.length <= 2) return 'opacity-60';
    if (sessions.length <= 3) return 'opacity-80';
    return 'opacity-100';
  };

  const weeks = [];
  for (let i = 0; i < practiceData.length; i += 7) {
    weeks.push(practiceData.slice(i, i + 7));
  }

  return (
    <Card>
      <CardHeader className="pb-2 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl">Practice History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-[2px] sm:gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-1">
              {week.map((day) => (
                <TooltipProvider key={day.date}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="relative w-2 h-2 sm:w-3 sm:h-3">
                        {day.sessions.map((session, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 rounded-[2px] sm:rounded-sm ${getIntensity(day.sessions)}`}
                            style={{ 
                              backgroundColor: getFrequencyColor(session.frequency),
                              transform: `rotate(${index * 45}deg)`
                            }}
                          />
                        ))}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs sm:text-sm">
                        <p className="font-semibold">{format(new Date(day.date), 'MMM d, yyyy')}</p>
                        <p>{day.sessions.length} practice sessions</p>
                        {day.sessions.map((session, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            {session.frequency}Hz - {Math.floor(session.duration / 60)}min
                          </p>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}