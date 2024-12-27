'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { savePracticeSession } from '@/lib/practice/storage';

interface Chakra {
  name: string;
  color: string;
  description: string;
}

const chakras: Chakra[] = [
  {
    name: 'Root',
    color: '#FF0000',
    description: 'Grounding, security, and physical needs'
  },
  {
    name: 'Sacral',
    color: '#FF7F00',
    description: 'Creativity, emotions, and relationships'
  },
  {
    name: 'Solar Plexus',
    color: '#FFFF00',
    description: 'Personal power, confidence, and self-esteem'
  },
  {
    name: 'Heart',
    color: '#00FF00',
    description: 'Love, compassion, and healing'
  },
  {
    name: 'Throat',
    color: '#0000FF',
    description: 'Communication and self-expression'
  },
  {
    name: 'Third Eye',
    color: '#4B0082',
    description: 'Intuition and spiritual awareness'
  },
  {
    name: 'Crown',
    color: '#8F00FF',
    description: 'Divine connection and enlightenment'
  }
];

export function ChakraAlignment() {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const handleChakraClick = (chakra: Chakra) => {
    if (activeChakra === chakra.name) {
      const sessionDuration = sessionStartTime 
        ? Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000)
        : 0;

      savePracticeSession({
        date: new Date().toISOString().split('T')[0],
        type: 'chakra',
        duration: sessionDuration,
        chakraFocus: chakra.name
      });

      setActiveChakra(null);
      setSessionStartTime(null);
    } else {
      setActiveChakra(chakra.name);
      setSessionStartTime(new Date());
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="grid gap-4">
        {chakras.map((chakra, index) => (
          <motion.div
            key={chakra.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={activeChakra === chakra.name ? 'default' : 'outline'}
              className="w-full"
              onClick={() => handleChakraClick(chakra)}
              style={{
                backgroundColor: activeChakra === chakra.name ? chakra.color : undefined,
                color: activeChakra === chakra.name ? '#ffffff' : undefined
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: chakra.color }}
                />
                <span>{chakra.name}</span>
              </div>
            </Button>
            {activeChakra === chakra.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-muted-foreground mt-2 px-4"
              >
                {chakra.description}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}