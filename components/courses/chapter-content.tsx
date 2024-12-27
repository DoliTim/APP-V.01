'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Chapter } from '@/lib/courses/types';
import Markdown from 'react-markdown';

interface ChapterContentProps {
  chapter: Chapter;
  index: number;
}

export function ChapterContent({ chapter, index }: ChapterContentProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">
          {index + 1}. {chapter.title}
        </h2>
        <Separator className="my-4" />
        <div className="prose dark:prose-invert max-w-none">
          <Markdown>{chapter.content}</Markdown>
        </div>
        {chapter.resources && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Additional Resources</h3>
            <ul className="list-disc list-inside">
              {chapter.resources.map((resource, i) => (
                <li key={i}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}