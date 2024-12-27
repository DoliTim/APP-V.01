'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  requiresV2: boolean;
  frequencies: string[];
  benefits: string[];
}

const programs: Program[] = [
  {
    id: 'earth-connection',
    title: 'Earth Connection',
    description: 'Connect with Earth\'s natural frequency for grounding and balance',
    duration: '4 weeks',
    requiresV2: false,
    frequencies: ['7.83 Hz Schumann Resonance'],
    benefits: ['Improved sleep', 'Reduced stress', 'Enhanced wellbeing']
  },
  {
    id: 'chakra-alignment',
    title: 'Chakra Alignment',
    description: 'Progressive chakra balancing using Solfeggio frequencies',
    duration: '7 weeks',
    requiresV2: true,
    frequencies: ['396 Hz', '417 Hz', '528 Hz', '639 Hz', '741 Hz', '852 Hz', '963 Hz'],
    benefits: ['Energy balance', 'Emotional healing', 'Spiritual growth']
  },
  {
    id: 'brain-optimization',
    title: 'Brain Wave Optimization',
    description: 'Enhance mental performance through brainwave entrainment',
    duration: '6 weeks',
    requiresV2: true,
    frequencies: ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'],
    benefits: ['Improved focus', 'Better memory', 'Enhanced creativity']
  },
  {
    id: 'deep-healing',
    title: 'Deep Healing',
    description: 'Comprehensive healing using Earth and planetary frequencies',
    duration: '8 weeks',
    requiresV2: true,
    frequencies: ['7.83 Hz', '126.22 Hz', '432 Hz', '528 Hz'],
    benefits: ['Physical healing', 'Emotional balance', 'Cellular regeneration']
  }
];

interface OptimizationProgramsProps {
  deviceType: 'v1' | 'v2' | null;
}

export function OptimizationPrograms({ deviceType }: OptimizationProgramsProps) {
  return (
    <div className="grid gap-6">
      {programs.map((program) => (
        <Card 
          key={program.id}
          className={program.requiresV2 && deviceType !== 'v2' ? 'opacity-60' : ''}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {program.title}
                  {program.requiresV2 && (
                    <Badge variant="secondary">V2 Pro</Badge>
                  )}
                </CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {program.duration}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Frequencies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {program.frequencies.map((freq) => (
                    <Badge key={freq} variant="outline">{freq}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {program.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <Button 
                className="w-full"
                disabled={program.requiresV2 && deviceType !== 'v2'}
              >
                {program.requiresV2 && deviceType !== 'v2' ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Requires V2 Pro
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Start Program
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}