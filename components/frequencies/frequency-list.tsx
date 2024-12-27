'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Zap } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import { frequencies, type Frequency } from '@/lib/frequencies/data';
import { useState } from 'react';

export interface FrequencyListProps {
  searchQuery?: string;
  categoryFilter?: string;
}

export function FrequencyList({ searchQuery = "", categoryFilter = "all" }: FrequencyListProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Group frequencies by category
  const groupedFrequencies = frequencies.reduce((acc, freq) => {
    const matchesSearch = 
      freq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freq.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || freq.category === categoryFilter;
    
    if (matchesSearch && matchesCategory) {
      if (!acc[freq.category]) {
        acc[freq.category] = [];
      }
      acc[freq.category].push(freq);
    }
    return acc;
  }, {} as Record<string, Frequency[]>);

  const categoryTitles: Record<string, string> = {
    solfeggio: "Solfeggio Frequencies - Sacred Sound Healing",
    brainwave: "Brainwave Frequencies - Neural States",
    tesla: "Tesla Frequencies - Universal Mathematics",
    angel: "Angel Frequencies - Divine Connection",
    planetary: "Planetary Frequencies - Cosmic Harmony",
    special: "Special Frequencies - Unique Healing Tones"
  };

  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
      // Stop playing
    } else {
      setPlayingId(id);
      // Start playing
    }
  };

  // Sort categories in preferred order
  const categoryOrder = ["solfeggio", "brainwave", "tesla", "angel", "planetary", "special"];
  const sortedCategories = Object.keys(groupedFrequencies).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div className="space-y-12">
      {sortedCategories.map(category => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm py-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {categoryTitles[category]}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {category === "solfeggio" && "Ancient frequencies for chakra healing and spiritual transformation"}
              {category === "brainwave" && "Frequencies that match different states of consciousness"}
              {category === "tesla" && "Based on Nikola Tesla's 3-6-9 theory of universal mathematics"}
              {category === "angel" && "Sacred frequencies for divine connection and spiritual guidance"}
              {category === "planetary" && "Resonant frequencies of celestial bodies"}
              {category === "special" && "Unique frequencies with specific healing properties"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFrequencies[category].map((frequency) => (
              <motion.div
                key={frequency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative h-full bg-black/40 border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{frequency.name}</CardTitle>
                        <div className="text-lg font-medium text-purple-400">{frequency.value} Hz</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="capitalize bg-purple-500/10 border-purple-500/20"
                      >
                        {frequency.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400">{frequency.description}</p>
                    
                    {frequency.chakra && (
                      <div className="flex items-center gap-2 text-purple-400">
                        <Zap className="h-4 w-4" />
                        <span>{frequency.chakra}</span>
                      </div>
                    )}

                    {frequency.benefits && (
                      <div className="space-y-2">
                        <div className="font-medium">Benefits:</div>
                        <div className="flex flex-wrap gap-2">
                          {frequency.benefits.map((benefit, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className="bg-purple-500/5 border-purple-500/20"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {frequency.history && (
                      <div className="space-y-1">
                        <div className="font-medium">History:</div>
                        <p className="text-sm text-gray-400">{frequency.history}</p>
                      </div>
                    )}

                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => handlePlay(frequency.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
                    >
                      {playingId === frequency.id ? (
                        <><Pause className="h-4 w-4 mr-2" /> Stop</>
                      ) : (
                        <><Play className="h-4 w-4 mr-2" /> Play</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}