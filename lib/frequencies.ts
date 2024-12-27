export interface Frequency {
  id: string;
  hz: number;
  name: string;
  description: string;
  category: 'solfeggio' | 'angelic' | 'planetary' | 'earth';
  benefits: string[];
  chakra?: string;
  color?: string;
}

export const frequencies: Frequency[] = [
  {
    id: 'sol-396',
    hz: 396,
    name: 'Liberation',
    category: 'solfeggio',
    description: 'Liberating guilt and fear',
    benefits: ['Releases guilt and fear', 'Transforms grief into joy', 'Liberates energy blockages'],
    chakra: 'Root',
    color: '#FF0000'
  },
  {
    id: 'sol-417',
    hz: 417,
    name: 'Transformation',
    category: 'solfeggio',
    description: 'Facilitating change',
    benefits: ['Undoing situations', 'Facilitating change', 'Clearing traumatic experiences'],
    chakra: 'Sacral',
    color: '#FF7F00'
  },
  // Add more frequencies as needed
];

export function getFrequencyByCategory(category: Frequency['category']) {
  return frequencies.filter(freq => freq.category === category);
}

export function getFrequencyById(id: string) {
  return frequencies.find(freq => freq.id === id);
}