'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function DeviceSettings() {
  const [deviceType, setDeviceType] = useState('v1');
  const [customFrequency, setCustomFrequency] = useState('7.83');
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Device Configuration</CardTitle>
          <CardDescription>
            Configure your Schumann device settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Device Model</Label>
            <Select value={deviceType} onValueChange={setDeviceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">Schumann V1 (7.83 Hz)</SelectItem>
                <SelectItem value="v2">Schumann V2 Pro (Full Spectrum)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {deviceType === 'v2' && (
            <div className="space-y-2">
              <Label>Custom Frequency (Hz)</Label>
              <Input
                type="number"
                step="0.01"
                value={customFrequency}
                onChange={(e) => setCustomFrequency(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                V2 Pro supports frequencies from 0.1 Hz to 999 Hz
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button 
              onClick={() => setIsConnected(!isConnected)}
              variant={isConnected ? "destructive" : "default"}
            >
              {isConnected ? "Disconnect Device" : "Connect Device"}
            </Button>
            {isConnected && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                Device Connected
              </div>
            )}
          </div>

          {!isConnected && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Connect your device to access all features
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}