'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DeviceCheckProps {
  onDeviceSelect: (type: 'v1' | 'v2') => void;
}

export function DeviceCheck({ onDeviceSelect }: DeviceCheckProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Select Your Device</CardTitle>
            <CardDescription>
              Choose your Schumann device to access personalized optimization programs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              className="w-full py-8 text-lg"
              variant="outline"
              onClick={() => onDeviceSelect('v1')}
            >
              Schumann V1
              <span className="block text-sm text-muted-foreground mt-2">
                7.83 Hz Earth Frequency
              </span>
            </Button>

            <Button 
              className="w-full py-8 text-lg"
              onClick={() => onDeviceSelect('v2')}
            >
              Schumann V2 Pro
              <span className="block text-sm text-muted-foreground mt-2">
                Full Spectrum Frequency Optimization
              </span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}