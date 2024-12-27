'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function PersonalNotes() {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('personal_notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSave = () => {
    localStorage.setItem('personal_notes', notes);
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Record your experiences, insights, and observations..."
        className="min-h-[200px]"
      />
      <Button onClick={handleSave}>Save Notes</Button>
    </div>
  );
}