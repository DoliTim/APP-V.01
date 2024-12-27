'use client';

import { PracticeSession, PracticeDay } from './types';

const STORAGE_KEY = 'practice_history';

export function savePracticeSession(session: PracticeSession) {
  const history = getPracticeHistory();
  const dayIndex = history.findIndex(day => day.date === session.date);

  if (dayIndex >= 0) {
    history[dayIndex].sessions.push(session);
  } else {
    history.push({
      date: session.date,
      sessions: [session]
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getPracticeHistory(): PracticeDay[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getLastNDays(n: number): PracticeDay[] {
  const history = getPracticeHistory();
  const today = new Date();
  const days: PracticeDay[] = [];

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const existingDay = history.find(day => day.date === dateStr);
    if (existingDay) {
      days.push(existingDay);
    } else {
      days.push({ date: dateStr, sessions: [] });
    }
  }

  return days.reverse();
}