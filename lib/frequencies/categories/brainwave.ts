import { Frequency } from '../types';

export const brainwaveFrequencies: Frequency[] = [
  {
    id: 'delta',
    hz: 0.5,
    name: 'Delta Waves',
    description: 'Deep sleep and healing frequency range (0.5-4 Hz)',
    benefits: [
      'Deep restorative sleep',
      'Physical healing',
      'Cellular regeneration',
      'Immune system enhancement',
      'Pain relief',
      'Unconscious mind access'
    ],
    color: '#1A237E',
    history: `Delta waves were first discovered in 1936 by W. Grey Walter using EEG technology. 
    Ancient civilizations unknowingly accessed these states through deep meditation practices and 
    healing ceremonies. Traditional Tibetan sleep yogis developed techniques to maintain consciousness 
    while in delta states, accessing profound healing and spiritual insights.`,
    
    science: `Delta waves represent the slowest brain wave frequency, occurring primarily during deep, 
    dreamless sleep. Research shows these waves trigger the release of human growth hormone and other 
    healing compounds. Studies indicate delta waves enhance the body's natural repair mechanisms, 
    reduce inflammation, and promote cellular regeneration. The immune system shows increased activity 
    during delta wave states.`,
    
    effects: [
      'Activates the body\'s natural healing mechanisms',
      'Enhances growth hormone production',
      'Deepens sleep quality and restoration',
      'Reduces chronic inflammation',
      'Supports immune system function',
      'Facilitates unconscious mind integration'
    ]
  },
  {
    id: 'theta',
    hz: 6.0,
    name: 'Theta Waves',
    description: 'Meditation and creativity frequency range (4-8 Hz)',
    benefits: [
      'Enhanced meditation',
      'Creative inspiration',
      'Emotional processing',
      'Memory consolidation',
      'Intuitive insights',
      'Spiritual connection'
    ],
    color: '#311B92',
    history: `Theta waves were traditionally accessed through ancient shamanic practices and 
    meditation techniques. Native American vision quests, Buddhist meditation, and Hindu yogic 
    practices all describe states that modern science recognizes as theta consciousness. These 
    frequencies were considered gateways to higher wisdom and healing.`,
    
    science: `Theta waves bridge conscious and subconscious mind, occurring during deep meditation, 
    light sleep, and REM states. Research shows increased theta activity correlates with enhanced 
    creativity, emotional processing, and memory consolidation. Studies indicate theta states 
    facilitate neuroplasticity and learning. This frequency range also plays a crucial role in 
    processing traumatic experiences and emotional healing.`,
    
    effects: [
      'Facilitates deep meditative states',
      'Enhances creative problem-solving',
      'Supports emotional healing',
      'Improves memory formation',
      'Increases intuitive awareness',
      'Promotes spiritual experiences'
    ]
  },
  {
    id: 'alpha',
    hz: 10.0,
    name: 'Alpha Waves',
    description: 'Relaxation and focus frequency range (8-13 Hz)',
    benefits: [
      'Mental clarity',
      'Stress reduction',
      'Enhanced learning',
      'Improved focus',
      'Positive mindset',
      'Mind-body integration'
    ],
    color: '#4A148C',
    history: `Alpha waves were the first brain wave patterns to be discovered by Hans Berger in 1929. 
    Ancient meditation practices, particularly Zen traditions, developed techniques that naturally 
    induced alpha states. The relationship between alpha waves and relaxed awareness has been used 
    in traditional practices worldwide.`,
    
    science: `Alpha waves represent the brain's natural resting state frequency, occurring during 
    relaxed alertness. Research shows alpha activity increases serotonin and reduces cortisol levels. 
    Studies demonstrate enhanced learning capability and information retention during alpha states. 
    This frequency range creates an optimal balance between relaxation and mental clarity.`,
    
    effects: [
      'Reduces stress and anxiety',
      'Enhances mental performance',
      'Improves memory retention',
      'Balances emotional states',
      'Increases focus duration',
      'Promotes relaxed alertness'
    ]
  },
  {
    id: 'beta',
    hz: 20.0,
    name: 'Beta Waves',
    description: 'Active thinking and focus frequency range (13-30 Hz)',
    benefits: [
      'Sharp focus',
      'Analytical thinking',
      'Problem solving',
      'Active learning',
      'Decision making',
      'Mental energy'
    ],
    color: '#6A1B9A',
    history: `Beta waves represent our normal waking consciousness, though ancient practices recognized 
    the importance of balanced mental activity. Traditional Chinese medicine and Ayurvedic practices 
    developed techniques to maintain optimal beta states without overstimulation, promoting clear 
    thinking while avoiding mental fatigue.`,
    
    science: `Beta waves dominate during conscious, alert states. Research shows moderate beta activity 
    supports focus and cognitive processing, while excessive beta can indicate stress or anxiety. 
    Studies demonstrate beta waves play crucial roles in decision-making, problem-solving, and 
    critical thinking. This frequency range is essential for daily cognitive tasks and learning.`,
    
    effects: [
      'Enhances cognitive performance',
      'Improves concentration',
      'Supports logical thinking',
      'Facilitates learning',
      'Increases mental alertness',
      'Promotes active problem-solving'
    ]
  },
  {
    id: 'gamma',
    hz: 40.0,
    name: 'Gamma Waves',
    description: 'Peak mental activity and consciousness (30-100 Hz)',
    benefits: [
      'Peak performance',
      'Higher consciousness',
      'Advanced cognition',
      'Information synthesis',
      'Spiritual insight',
      'Enhanced perception'
    ],
    color: '#8E24AA',
    history: `Gamma waves were discovered relatively recently but correspond to states described in 
    advanced meditation practices. Tibetan monks showing unusually high gamma activity during 
    meditation helped establish the link between these frequencies and heightened states of 
    consciousness. Ancient texts describe similar states of expanded awareness.`,
    
    science: `Gamma represents the fastest brain wave frequency, associated with peak performance 
    and heightened consciousness. Research shows increased gamma activity during moments of insight 
    and complex information processing. Studies of long-term meditators reveal sustained gamma 
    activity correlating with expanded awareness and spiritual experiences. This frequency range 
    facilitates binding of information across different brain regions.`,
    
    effects: [
      'Facilitates peak mental states',
      'Enhances consciousness',
      'Improves information processing',
      'Increases sensory perception',
      'Promotes neural synchronization',
      'Supports spiritual experiences'
    ]
  }
];