import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, RefreshCw, Save, 
  Volume2, Brain, Heart, Zap, 
  Timer, Settings2, Maximize2 
} from 'lucide-react';
import { useUserProgress } from '@/lib/store/user-progress';

interface WaveformVisualizerProps {
  frequency: number;
  isPlaying: boolean;
  volume: number;
}

const WaveformVisualizer = ({ frequency, isPlaying, volume }: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
      
      for (let x = 0; x < ctx.canvas.width; x++) {
        const y = ctx.canvas.height / 2 + 
          Math.sin(x * frequency / 100 + phase) * 
          (ctx.canvas.height / 3) * (volume / 100);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = `rgba(168, 85, 247, ${volume / 100})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      phase += 0.05;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [frequency, isPlaying, volume]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-40 bg-black/20 rounded-lg"
      width={800}
      height={160}
    />
  );
};

export function EnhancedPracticeSession() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [frequency, setFrequency] = useState(7.83);
  const [duration, setDuration] = useState(15);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const addPracticeTime = useUserProgress(state => state.addPracticeTime);
  const updateStreak = useUserProgress(state => state.updateStreak);

  // ... Timer logic and handlers ...

  return (
    <Card className={`relative transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
    }`}>
      <CardContent className="p-6 space-y-6">
        {/* Frequency Waveform */}
        <WaveformVisualizer 
          frequency={frequency} 
          isPlaying={isPlaying} 
          volume={volume} 
        />

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Frequency (Hz)</label>
            <Slider
              value={[frequency]}
              onValueChange={([value]) => setFrequency(value)}
              min={0.1}
              max={40}
              step={0.01}
              className="bg-purple-500/10"
            />
            <div className="flex justify-between text-sm">
              <span>0.1 Hz</span>
              <span className="font-medium">{frequency.toFixed(2)} Hz</span>
              <span>40 Hz</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Volume</label>
            <Slider
              value={[volume]}
              onValueChange={([value]) => setVolume(value)}
              min={0}
              max={100}
              className="bg-purple-500/10"
            />
            <div className="flex justify-between text-sm">
              <span>0%</span>
              <span className="font-medium">{volume}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Real-time Feedback */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Brain className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-sm font-medium">Brain State</div>
            <div className="text-xs text-muted-foreground">Alpha</div>
          </div>
          <div className="text-center">
            <Heart className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-sm font-medium">Coherence</div>
            <div className="text-xs text-muted-foreground">85%</div>
          </div>
          <div className="text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-sm font-medium">Resonance</div>
            <div className="text-xs text-muted-foreground">High</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 