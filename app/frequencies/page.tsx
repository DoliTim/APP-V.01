'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { frequencyCategories } from '@/lib/frequencies/data';
import { useState } from 'react';
import { Info, Sparkles, Brain, Heart } from 'lucide-react';

export default function FrequenciesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <Badge 
              variant="outline" 
              className="mb-6 border-purple-500/50 bg-purple-500/10"
            >
              Sacred Knowledge
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Sacred Frequency
              </span>
              <br />
              <span className="text-white">
                Library
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the healing frequencies of Earth, ancient traditions, and cosmic harmonies
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {frequencyCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              className={`p-6 rounded-xl border transition-all duration-300 relative overflow-hidden
                ${selectedCategory === category.id 
                  ? 'bg-purple-900/20 border-purple-500/50' 
                  : 'bg-black/40 border-purple-500/20 hover:bg-purple-900/10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
              <h3 className="font-semibold relative z-10">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 relative z-10">{category.description}</p>
            </motion.button>
          ))}
        </div>

        {/* All Categories Content */}
        <div className="space-y-16">
          {frequencyCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className={`${selectedCategory && selectedCategory !== category.id ? 'hidden' : ''}`}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  {category.name}
                </span>
                <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10">
                  {category.frequencies.length} frequencies
                </Badge>
              </h2>

              <div className="grid gap-6">
                {category.frequencies.map((frequency, index) => (
                  <motion.div
                    key={frequency.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/40 border-purple-500/20 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-xl font-bold">{frequency.name}</h3>
                          <Badge 
                            variant="outline" 
                            className="border-purple-500/50 bg-purple-500/10"
                          >
                            {frequency.hz} Hz
                          </Badge>
                        </div>

                        {/* Wave Visualization */}
                        <div className="relative h-40 bg-black/20 rounded-lg overflow-hidden mb-6">
                          <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: `${frequency.color}10` }}
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 60 / frequency.hz,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
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
                        </div>

                        {/* Content Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Benefits */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-purple-400" />
                              <h4 className="font-semibold">Benefits</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {frequency.benefits.map((benefit, index) => (
                                <Badge 
                                  key={index}
                                  variant="outline"
                                  className="border-purple-500/20 bg-purple-500/5"
                                >
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Effects */}
                          {frequency.effects && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-purple-400" />
                                <h4 className="font-semibold">Effects</h4>
                              </div>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {frequency.effects.map((effect, index) => (
                                  <li key={index}>• {effect}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Resonance */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Heart className="h-5 w-5 text-purple-400" />
                              <h4 className="font-semibold">Resonance</h4>
                            </div>
                            <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Info className="h-4 w-4 text-purple-400" />
                                <span className="text-sm font-medium">Optimal Use</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Best experienced through our frequency optimization devices for maximum benefits.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        {(frequency.history || frequency.science) && (
                          <div className="mt-6 grid gap-4">
                            {frequency.history && (
                              <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                                <h4 className="font-semibold mb-2">Historical Context:</h4>
                                <p className="text-sm text-muted-foreground">{frequency.history}</p>
                              </div>
                            )}
                            {frequency.science && (
                              <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                                <h4 className="font-semibold mb-2">Scientific Background:</h4>
                                <p className="text-sm text-muted-foreground">{frequency.science}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Chakra Information */}
                        {frequency.chakra && (
                          <div className="mt-6 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                            <h4 className="font-semibold mb-2">Chakra Alignment:</h4>
                            <p className="text-muted-foreground">
                              This frequency resonates with the {frequency.chakra} Chakra, 
                              supporting energy balance and spiritual alignment.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}