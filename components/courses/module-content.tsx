'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getModuleById, modules } from '@/lib/courses/data';
import { ChapterContent } from '@/components/courses/chapter-content';
import Link from 'next/link';

export function ModuleContent({ moduleId }: { moduleId: string }) {
  const module = getModuleById(moduleId);
  
  const currentIndex = modules.findIndex(m => m.id === moduleId);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/learn">
              <Button variant="ghost">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Modules
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{module.description}</p>

          <div className="grid gap-8">
            {module.chapters.map((chapter, index) => (
              <ChapterContent key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            {prevModule ? (
              <Link href={`/learn/${prevModule.id}`}>
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {prevModule.title}
                </Button>
              </Link>
            ) : (
              <Button variant="outline" disabled>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Module
              </Button>
            )}
            
            {nextModule ? (
              <Link href={`/learn/${nextModule.id}`}>
                <Button>
                  {nextModule.title}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button disabled>
                Next Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}