export interface Frequency {
  id: string;
  hz: number;
  name: string;
  description: string;
  benefits: string[];
  color?: string;
  chakra?: string;
}

export interface FrequencyCategory {
  id: string;
  name: string;
  description: string;
  frequencies: Frequency[];
}