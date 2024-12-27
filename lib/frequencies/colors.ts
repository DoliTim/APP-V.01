import * as THREE from 'three'

interface ColorTheme {
  primary: string
  secondary: string
  accent: string
  glow: string
  name: string
  description: string
}

// Chakra colors - More vibrant and distinct
export const chakraColors: { [freq: number]: ColorTheme } = {
  396: { // Root Chakra - Deep Red with magenta undertones
    primary: '#FF0033',
    secondary: '#990033',
    accent: '#FF3366',
    glow: '#FF003399',
    name: '🔮 Root Chakra',
    description: '💫 Grounding & Life Force'
  },
  417: { // Sacral Chakra - Rich Orange with gold
    primary: '#FF6600',
    secondary: '#CC4400',
    accent: '#FFB366',
    glow: '#FF660099',
    name: '🌟 Sacral Chakra',
    description: '✨ Creativity & Passion'
  },
  528: { // Solar Plexus - Brilliant Yellow with amber
    primary: '#FFD700',
    secondary: '#CC9900',
    accent: '#FFE666',
    glow: '#FFD70099',
    name: '☀️ Solar Plexus',
    description: '⚡ Power & Confidence'
  },
  639: { // Heart Chakra - Emerald Green
    primary: '#00CC66',
    secondary: '#006633',
    accent: '#66FF99',
    glow: '#00CC6699',
    name: '💚 Heart Chakra',
    description: '🌿 Love & Harmony'
  },
  741: { // Throat Chakra - Electric Blue
    primary: '#00CCFF',
    secondary: '#0099CC',
    accent: '#66FFFF',
    glow: '#00CCFF99',
    name: '💎 Throat Chakra',
    description: '🌊 Expression & Truth'
  },
  852: { // Third Eye - Deep Indigo
    primary: '#4B0082',
    secondary: '#2E0854',
    accent: '#9933FF',
    glow: '#4B008299',
    name: '👁️ Third Eye',
    description: '🔮 Vision & Intuition'
  },
  963: { // Crown Chakra - Royal Purple
    primary: '#9933FF',
    secondary: '#6600CC',
    accent: '#CC99FF',
    glow: '#9933FF99',
    name: '👑 Crown Chakra',
    description: '✨ Divine Connection'
  }
}

// Solfeggio frequencies - More ethereal and cosmic colors
export const solfeggioColors: { [freq: number]: ColorTheme } = {
  174: { // Pain Relief - Healing Pink
    primary: '#FF66B2',
    secondary: '#CC3366',
    accent: '#FF99CC',
    glow: '#FF66B299',
    name: '💗 Pain Relief',
    description: '🌸 Physical Healing'
  },
  285: { // Quantum Field - Electric Violet
    primary: '#CC33FF',
    secondary: '#9900CC',
    accent: '#E699FF',
    glow: '#CC33FF99',
    name: '⚡ Energy Field',
    description: '🌌 Quantum Healing'
  },
  396: { // Liberation - Deep Purple
    primary: '#9900FF',
    secondary: '#6600CC',
    accent: '#CC99FF',
    glow: '#9900FF99',
    name: '🦋 Liberation',
    description: '🌟 Freedom & Release'
  },
  417: { // Change - Cosmic Orange
    primary: '#FF9933',
    secondary: '#CC6600',
    accent: '#FFCC99',
    glow: '#FF993399',
    name: '🌅 Transformation',
    description: '🔄 Change & Renewal'
  },
  528: { // Miracle - Emerald Gold
    primary: '#33CC33',
    secondary: '#009900',
    accent: '#99FF99',
    glow: '#33CC3399',
    name: '✨ Miracle Tone',
    description: '🧬 DNA Repair & Harmony'
  },
  639: { // Connection - Celestial Blue
    primary: '#3366FF',
    secondary: '#0033CC',
    accent: '#99B2FF',
    glow: '#3366FF99',
    name: '🌌 Connection',
    description: '💫 Universal Love'
  },
  741: { // Expression - Cosmic Purple
    primary: '#CC66FF',
    secondary: '#9933CC',
    accent: '#E6B2FF',
    glow: '#CC66FF99',
    name: '🎭 Expression',
    description: '🗣️ Pure Communication'
  },
  852: { // Return - Spiritual Gold
    primary: '#FFCC33',
    secondary: '#CC9900',
    accent: '#FFE699',
    glow: '#FFCC3399',
    name: '🌟 Spiritual Order',
    description: '🔮 Divine Return'
  },
  963: { // Unity - Transcendent White-Gold
    primary: '#FFE5CC',
    secondary: '#FFCC99',
    accent: '#FFF2E6',
    glow: '#FFE5CC99',
    name: '�� Unity Light',
    description: '✨ Cosmic Connection'
  }
}

// Earth frequencies - Natural and elemental colors
export const earthColors: { [freq: number]: ColorTheme } = {
  7.83: { // Schumann - Earth Green
    primary: '#33CC33',
    secondary: '#006600',
    accent: '#99FF99',
    glow: '#33CC3399',
    name: '🌍 Schumann',
    description: '💚 Earth\'s Heartbeat'
  },
  14.3: { // Second Harmonic - Ocean Blue
    primary: '#0099CC',
    secondary: '#006699',
    accent: '#66CCFF',
    glow: '#0099CC99',
    name: '🌊 Earth Harmonic',
    description: '💫 Planetary Pulse'
  },
  20.8: { // Third Harmonic - Sky Blue
    primary: '#3399FF',
    secondary: '#0066CC',
    accent: '#99CCFF',
    glow: '#3399FF99',
    name: '☁️ Sky Harmonic',
    description: '✨ Atmospheric Resonance'
  }
}

// Get color theme based on frequency
export function getFrequencyColorTheme(frequency: number): ColorTheme {
  // Find exact match first
  const exactMatch = {
    ...chakraColors,
    ...solfeggioColors,
    ...earthColors
  }[frequency]

  if (exactMatch) return exactMatch

  // RGB Rainbow gradient for custom frequencies
  // Map frequency ranges to specific color ranges
  const frequencyRanges = [
    { min: 0, max: 100, colors: ['#FF0000', '#FF00FF'] },     // Red to Magenta
    { min: 100, max: 300, colors: ['#FF00FF', '#0000FF'] },   // Magenta to Blue
    { min: 300, max: 500, colors: ['#0000FF', '#00FFFF'] },   // Blue to Cyan
    { min: 500, max: 700, colors: ['#00FFFF', '#00FF00'] },   // Cyan to Green
    { min: 700, max: 900, colors: ['#00FF00', '#FFFF00'] },   // Green to Yellow
    { min: 900, max: 1000, colors: ['#FFFF00', '#FF0000'] }   // Yellow to Red
  ]

  // Find the appropriate range for this frequency
  const range = frequencyRanges.find(r => frequency >= r.min && frequency <= r.max) 
    || frequencyRanges[frequencyRanges.length - 1]

  // Calculate position within the range
  const position = (frequency - range.min) / (range.max - range.min)
  
  // Create color gradient
  const startColor = new THREE.Color(range.colors[0])
  const endColor = new THREE.Color(range.colors[1])
  const color = new THREE.Color()
  color.r = startColor.r + (endColor.r - startColor.r) * position
  color.g = startColor.g + (endColor.g - startColor.g) * position
  color.b = startColor.b + (endColor.b - startColor.b) * position

  // Make colors more vibrant
  const primary = color.getHexString()
  const secondary = new THREE.Color(
    color.r * 0.6,
    color.g * 0.6,
    color.b * 0.6
  ).getHexString()
  const accent = new THREE.Color(
    Math.min(1, color.r * 1.2),
    Math.min(1, color.g * 1.2),
    Math.min(1, color.b * 1.2)
  ).getHexString()

  // Get descriptive name based on color
  const hsl = { h: 0, s: 0, l: 0 }
  color.getHSL(hsl)
  const hue = hsl.h * 360
  let colorName = '🌈'
  if (hue < 30) colorName = '🔴'
  else if (hue < 60) colorName = '🟠'
  else if (hue < 120) colorName = '🟡'
  else if (hue < 180) colorName = '🟢'
  else if (hue < 240) colorName = '🔵'
  else if (hue < 300) colorName = '🟣'
  else colorName = '🌺'

  return {
    primary: `#${primary}`,
    secondary: `#${secondary}`,
    accent: `#${accent}`,
    glow: `#${primary}99`,
    name: `${colorName} Custom Wave`,
    description: `${frequency.toFixed(2)}Hz ✨ Harmonic Flow`
  }
} 