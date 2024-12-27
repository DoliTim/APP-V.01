'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrequencyTimer } from '@/components/practice/frequency-timer';
import { PracticeCalendar } from '@/components/practice/practice-calendar';
import { FrequencyVisualizer } from '@/components/practice/frequency-visualizer';

export default function ReoptimizePage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Sacred Frequency Reoptimization</h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Realign with Earth's natural frequencies and track your journey
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[640px] sm:min-w-0">
              <PracticeCalendar />
            </div>
          </div>

          <Tabs defaultValue="timer" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timer">Timer</TabsTrigger>
              <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
            </TabsList>

            <TabsContent value="timer">
              <Card>
                <CardHeader className="sm:flex sm:items-center sm:justify-between">
                  <CardTitle className="text-lg sm:text-xl">Frequency Timer</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <FrequencyTimer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualizer">
              <Card>
                <CardHeader className="sm:flex sm:items-center sm:justify-between">
                  <CardTitle className="text-lg sm:text-xl">Frequency Visualizer</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <FrequencyVisualizer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}