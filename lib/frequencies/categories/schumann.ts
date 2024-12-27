import { Frequency } from '../data';

export const schumannFrequencies: Frequency[] = [
  {
    id: 'schumann-primary',
    hz: 7.83,
    name: 'Primary Schumann Resonance',
    category: 'schumann',
    description: 'Earth\'s fundamental frequency, known as the Earth\'s heartbeat',
    benefits: ['Natural healing', 'Grounding', 'Stress reduction', 'Sleep improvement'],
    color: '#4CAF50'
  },
  {
    id: 'schumann-second',
    hz: 14.3,
    name: 'Second Harmonic',
    category: 'schumann',
    description: 'Second harmonic of the Schumann resonance',
    benefits: ['Enhanced focus', 'Mental clarity', 'Cognitive performance'],
    requiresV2: true,
    color: '#2196F3'
  },
  {
    id: 'schumann-third',
    hz: 20.8,
    name: 'Third Harmonic',
    category: 'schumann',
    description: 'Third harmonic of the Schumann resonance',
    benefits: ['Deep meditation', 'Spiritual connection', 'Enhanced awareness'],
    requiresV2: true,
    color: '#9C27B0'
  }
];