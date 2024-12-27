export interface Frequency {
  id: string
  name: string
  value: number
  category: string
  description: string
  chakra?: string
  benefits?: string[]
  history?: string
  practiceTime?: number // Time in minutes for practice session
}

export const frequencies: Frequency[] = [
  // Solfeggio Frequencies
  {
    id: "sf1",
    name: "Liberating Frequency",
    value: 396,
    category: "solfeggio",
    description: "A powerful frequency for releasing guilt and fear, transforming grief into joy, and liberating yourself from limiting beliefs.",
    chakra: "Root Chakra",
    benefits: ["Releases Fear", "Transforms Grief", "Clears Guilt", "Grounds Energy"],
    history: "Part of the ancient Solfeggio scale, this frequency was used in sacred music including Gregorian Chants. It's connected to the Earth's natural vibrations.",
    practiceTime: 15
  },
  {
    id: "sf2",
    name: "Foundation Frequency",
    value: 174,
    category: "solfeggio",
    description: "The foundation frequency resonates with the foundational aspects of life, promoting security and inner strength.",
    benefits: ["Security", "Stability", "Inner Strength", "Grounding"],
    history: "Used in ancient healing practices to establish a solid foundation for personal growth and well-being.",
    practiceTime: 15
  },
  {
    id: "sf3",
    name: "Healing Frequency",
    value: 285,
    category: "solfeggio",
    description: "A powerful healing frequency for physical and emotional restoration.",
    benefits: ["Physical Healing", "Emotional Balance", "Tissue Regeneration", "Energy Flow"],
    history: "Traditional healers used this frequency for its therapeutic properties in restoring health and vitality.",
    practiceTime: 20
  },
  {
    id: "sf4",
    name: "Spiritual Frequency",
    value: 1074,
    category: "solfeggio",
    description: "Connects with higher consciousness and spiritual dimensions.",
    benefits: ["Spiritual Growth", "Divine Connection", "Higher Consciousness", "Enlightenment"],
    history: "Used in spiritual practices for deepening connection with divine realms.",
    practiceTime: 20
  },
  {
    id: "sf5",
    name: "Balance Frequency",
    value: 1174,
    category: "solfeggio",
    description: "Harmonizes energy within body and mind, restoring equilibrium.",
    benefits: ["Energy Balance", "Emotional Harmony", "Mental Clarity", "Peace"],
    history: "Ancient practitioners used this frequency to achieve balance in all aspects of life.",
    practiceTime: 15
  },
  {
    id: "sf6",
    name: "Spiritual Purification",
    value: 1152,
    category: "solfeggio",
    description: "Cleanses and purifies mind, body, and spirit.",
    benefits: ["Spiritual Cleansing", "Energy Purification", "Mental Clarity", "Emotional Release"],
    history: "Traditional spiritual practices incorporated this frequency for purification rituals.",
    practiceTime: 20
  },
  {
    id: "sf7",
    name: "Spiritual Enlightenment",
    value: 2172,
    category: "solfeggio",
    description: "Facilitates higher states of consciousness and spiritual awakening.",
    benefits: ["Enlightenment", "Consciousness Expansion", "Spiritual Insight", "Divine Wisdom"],
    history: "Used by spiritual masters to achieve elevated states of consciousness.",
    practiceTime: 25
  },

  // Higher Angelic Frequencies
  {
    id: "af5",
    name: "Divine Transformation",
    value: 555,
    category: "angel",
    description: "Associated with significant changes and divine transformation.",
    benefits: ["Positive Change", "Divine Guidance", "Transformation", "Adaptability"],
    history: "This frequency is believed to assist in major life transitions with divine support.",
    practiceTime: 15
  },
  {
    id: "af6",
    name: "Spiritual Integration",
    value: 666,
    category: "angel",
    description: "Represents balance and spiritual integration.",
    benefits: ["Balance", "Harmony", "Integration", "Transcendence"],
    history: "Used for aligning with higher energies and transcending dualities.",
    practiceTime: 20
  },
  {
    id: "af7",
    name: "Divine Awakening",
    value: 777,
    category: "angel",
    description: "Associated with spiritual awakening and divine truth.",
    benefits: ["Spiritual Awakening", "Divine Truth", "Higher Wisdom", "Enlightenment"],
    history: "Considered a powerful frequency for spiritual development and enlightenment.",
    practiceTime: 20
  },
  {
    id: "af8",
    name: "Divine Abundance",
    value: 888,
    category: "angel",
    description: "Connected to abundance and spiritual fulfillment.",
    benefits: ["Abundance", "Prosperity", "Fulfillment", "Material Success"],
    history: "Used to attract positive energies and align with divine prosperity.",
    practiceTime: 15
  },
  {
    id: "af9",
    name: "Divine Completion",
    value: 999,
    category: "angel",
    description: "Represents completion and spiritual enlightenment.",
    benefits: ["Completion", "Fulfillment", "New Beginnings", "Universal Connection"],
    history: "Associated with completing spiritual cycles and embracing new beginnings.",
    practiceTime: 20
  },

  // Additional Planetary Frequencies
  {
    id: "pf3",
    name: "Mercury Frequency",
    value: 141.27,
    category: "planetary",
    description: "The frequency of Mercury, associated with communication and intellect.",
    benefits: ["Communication", "Mental Agility", "Learning", "Expression"],
    history: "Ancient astrologers associated this frequency with Mercury's influence on communication.",
    practiceTime: 15
  },
  {
    id: "pf4",
    name: "Mars Frequency",
    value: 144.72,
    category: "planetary",
    description: "Mars' frequency, connected to energy and courage.",
    benefits: ["Courage", "Energy", "Motivation", "Action"],
    history: "Traditional practices used this frequency to enhance courage and determination.",
    practiceTime: 15
  },
  {
    id: "pf5",
    name: "Jupiter Frequency",
    value: 183.58,
    category: "planetary",
    description: "Jupiter's frequency of expansion and growth.",
    benefits: ["Growth", "Expansion", "Wisdom", "Abundance"],
    history: "Associated with Jupiter's expansive and beneficial influences.",
    practiceTime: 20
  },
  {
    id: "pf6",
    name: "Saturn Frequency",
    value: 147.85,
    category: "planetary",
    description: "Saturn's frequency of structure and discipline.",
    benefits: ["Discipline", "Structure", "Responsibility", "Mastery"],
    history: "Used to enhance discipline and achieve mastery in traditional practices.",
    practiceTime: 20
  },
  {
    id: "pf7",
    name: "Uranus Frequency",
    value: 207.36,
    category: "planetary",
    description: "Uranus' frequency of innovation and freedom.",
    benefits: ["Innovation", "Freedom", "Originality", "Change"],
    history: "Associated with breakthrough insights and revolutionary changes.",
    practiceTime: 15
  },
  {
    id: "pf8",
    name: "Neptune Frequency",
    value: 211.44,
    category: "planetary",
    description: "Neptune's frequency of intuition and spirituality.",
    benefits: ["Intuition", "Spirituality", "Imagination", "Dreams"],
    history: "Used in spiritual practices for enhancing intuitive abilities.",
    practiceTime: 20
  },
  {
    id: "pf9",
    name: "Pluto Frequency",
    value: 140.25,
    category: "planetary",
    description: "Pluto's frequency of transformation and regeneration.",
    benefits: ["Transformation", "Regeneration", "Power", "Rebirth"],
    history: "Associated with deep transformation and spiritual rebirth.",
    practiceTime: 25
  },

  // Special Healing Frequencies
  {
    id: "sp4",
    name: "Ancient Healing",
    value: 110,
    category: "special",
    description: "An ancient healing frequency for emotional regulation and grounding.",
    benefits: ["Emotional Balance", "Grounding", "Stress Relief", "Mental Clarity"],
    history: "Found in ancient sites like Malta's Hypogeum, this frequency was used in healing rituals. Modern studies show it stimulates the prefrontal cortex for emotional regulation.",
    practiceTime: 20
  }
]