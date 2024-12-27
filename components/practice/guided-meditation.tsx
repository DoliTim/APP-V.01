'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const meditations = [
  {
    id: 'grounding',
    title: 'Grounding Meditation',
    description: 'Connect with Earth\'s natural energy'
  },
  {
    id: 'heart-healing',
    title: 'Heart Chakra Healing',
    description: 'Open and balance the heart center'
  },
  {
    id: 'third-eye',
    title: 'Third Eye Activation',
    description: 'Enhance intuition and inner vision'
  }
];

export function GuidedMeditation() {
  const [selectedMeditation, setSelectedMeditation] = useState(meditations[0].id);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Select
          value={selectedMeditation}
          onValueChange={setSelectedMeditation}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a meditation" />
          </SelectTrigger>
          <SelectContent>
            {meditations.map(meditation => (
              <SelectItem key={meditation.id} value={meditation.id}>
                {meditation.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedMeditation && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Meditation Guide</h3>
              <p className="text-sm text-muted-foreground">
                1. Find a comfortable position and close your eyes
                <br />
                2. Take three deep breaths to center yourself
                <br />
                3. Focus on your intention for this practice
                <br />
                4. If your mind wanders, gently bring it back to your breath
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}