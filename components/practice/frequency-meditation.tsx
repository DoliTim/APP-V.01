'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause } from 'lucide-react';
import { solfeggioFrequencies } from '@/lib/frequencies/data';
import { frequencyPlayer } from '@/lib/frequencies/audio';

export function FrequencyMeditation() {
  const [selectedFrequency, setSelectedFrequency] = useState(solfeggioFrequencies[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const frequency = solfeggioFrequencies.find(f => f.id === selectedFrequency);
    if (!frequency) return;

    if (isPlaying) {
      frequencyPlayer.stop();
    } else {
      frequencyPlayer.play(frequency.hz);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Select
          value={selectedFrequency}
          onValueChange={value => {
            setSelectedFrequency(value);
            if (isPlaying) {
              frequencyPlayer.stop();
              setIsPlaying(false);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a frequency" />
          </SelectTrigger>
          <SelectContent>
            {solfeggioFrequencies.map(freq => (
              <SelectItem key={freq.id} value={freq.id}>
                {freq.name} - {freq.hz}Hz
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handlePlay} size="lg" className="w-full">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Stop' : 'Start'} Meditation
        </Button>
      </div>

      {selectedFrequency && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Meditation Guide</h3>
              <p className="text-sm text-muted-foreground">
                1. Find a comfortable position and close your eyes
                <br />
                2. Take three deep breaths to center yourself
                <br />
                3. Focus on the frequency and let it guide your meditation
                <br />
                4. If your mind wanders, gently bring it back to the sound
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}