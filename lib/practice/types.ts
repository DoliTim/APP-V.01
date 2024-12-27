export interface PracticeSession {
  date: string;
  type: 'meditation' | 'timer' | 'chakra';
  duration: number;
  chakraFocus?: string;
}

export interface PracticeDay {
  date: string;
  sessions: PracticeSession[];
}