'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  Music2, 
  Brain, 
  BookOpen, 
  Trophy,
  Timer,
  Zap,
  Heart,
  Lotus,
  ChevronDown 
} from 'lucide-react';

const practiceOptions = [
  {
    title: 'Quick Practice',
    description: 'Start a quick frequency session',
    icon: Timer,
    href: '/practice',
    color: 'text-purple-400',
    badge: 'Popular'
  },
  {
    title: 'Chakra Alignment',
    description: 'Balance your energy centers',
    icon: Lotus,
    href: '/practice?mode=chakra',
    color: 'text-pink-400'
  },
  {
    title: 'Brain Optimization',
    description: 'Enhance cognitive performance',
    icon: Brain,
    href: '/practice?mode=brain',
    color: 'text-blue-400'
  },
  {
    title: 'Heart Coherence',
    description: 'Emotional balance & healing',
    icon: Heart,
    href: '/practice?mode=heart',
    color: 'text-green-400'
  },
];

const frequencyCategories = [
  {
    title: 'Schumann Resonance',
    description: 'Earth\'s natural frequency',
    hz: '7.83 Hz',
    color: 'text-emerald-400'
  },
  {
    title: 'Alpha Waves',
    description: 'Relaxation & creativity',
    hz: '8-12 Hz',
    color: 'text-blue-400'
  },
  {
    title: 'Theta Waves',
    description: 'Deep meditation & healing',
    hz: '4-8 Hz',
    color: 'text-indigo-400'
  },
  {
    title: 'Delta Waves',
    description: 'Deep sleep & regeneration',
    hz: '0.5-4 Hz',
    color: 'text-violet-400'
  }
];

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Music2 className="h-6 w-6 text-purple-400" />
          <span className="font-bold text-lg">Schumann</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {/* Practice Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-purple-500/10 hover:bg-purple-500/20">
                <Zap className="h-4 w-4 mr-2 text-purple-400" />
                Practice
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-4 p-6 w-[600px]">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground">Practice Modes</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {practiceOptions.map((option) => (
                        <Link key={option.title} href={option.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-purple-500/10"
                          >
                            <option.icon className={`h-4 w-4 mr-2 ${option.color}`} />
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                {option.title}
                                {option.badge && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                                    {option.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground">Popular Frequencies</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {frequencyCategories.map((freq) => (
                        <div
                          key={freq.title}
                          className="p-2 rounded-lg hover:bg-purple-500/10 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`font-medium ${freq.color}`}>{freq.title}</div>
                              <p className="text-xs text-muted-foreground">{freq.description}</p>
                            </div>
                            <div className="text-xs font-mono bg-purple-500/20 px-2 py-1 rounded">
                              {freq.hz}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other Menu Items */}
            <NavigationMenuItem>
              <Link href="/courses" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 hover:text-purple-400">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/achievements" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 hover:text-purple-400">
                  <Trophy className="h-4 w-4 mr-2" />
                  Achievements
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Quick Practice Button */}
        <Link href="/practice">
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Timer className="h-4 w-4 mr-2" />
            Quick Practice
          </Button>
        </Link>
      </div>
    </header>
  );
} 