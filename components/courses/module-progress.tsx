'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen } from 'lucide-react';
import { Module } from '@/lib/courses/types';

interface ModuleProgressProps {
  module: Module;
  progress: number;
}

export function ModuleProgress({ module, progress }: ModuleProgressProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{module.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">{module.description}</p>
          </div>
          <Badge variant="secondary">{module.level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{module.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {module.chapters.length} chapters
            </span>
          </div>
        </div>
        <Progress value={progress} className="mb-2" />
        <span className="text-sm text-muted-foreground">{progress}% complete</span>
      </CardContent>
    </Card>
  );
}