'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { allFrequencies, frequencyCategories } from '@/lib/frequencies/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function FrequencyVisualizer() {
  const [selectedFrequency, setSelectedFrequency] = useState(allFrequencies[0].id);
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
        <div className="relative h-60 bg-black/20 rounded-lg overflow-hidden border"
          style={{ borderColor: `${frequency.color}40` }}
        >
          {/* Wave Animation */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              d={`M 0 ${30} Q ${25} ${10}, ${50} ${30} T ${100} ${30}`}
              fill="none"
              stroke={frequency.color}
              strokeWidth="2"
              strokeOpacity="0.5"
              animate={{
                d: [
                  `M 0 ${30} Q ${25} ${10}, ${50} ${30} T ${100} ${30}`,
                  `M 0 ${30} Q ${25} ${50}, ${50} ${30} T ${100} ${30}`,
                  `M 0 ${30} Q ${25} ${10}, ${50} ${30} T ${100} ${30}`
                ]
              }}
              transition={{
                duration: 60 / frequency.hz,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* Pulsing Circle */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 60 / frequency.hz,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${frequency.color}10` }}
          >
            <div 
              className="w-40 h-40 rounded-full"
              style={{ 
                backgroundColor: frequency.color,
                filter: 'blur(40px)',
                opacity: 0.3
              }}
            />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Badge 
                variant="outline"
                className="mb-2"
                style={{ borderColor: `${frequency.color}40` }}
              >
                {category?.name}
              </Badge>
              <h3 className="text-2xl font-bold mb-1" style={{ color: frequency.color }}>
                {frequency.hz} Hz
              </h3>
              <p className="text-sm text-muted-foreground">{frequency.name}</p>
            </div>
          </div>
        </div>
      )}

      {frequency && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-black/20 border" style={{ borderColor: `${frequency.color}40` }}>
            <h3 className="font-semibold mb-3">Benefits:</h3>
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
              <div className="mt-3 text-sm text-muted-foreground">
                Chakra Alignment: {frequency.chakra}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}