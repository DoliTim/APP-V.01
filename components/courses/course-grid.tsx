import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Book, Clock, Trophy, Brain, Heart, Sparkles, Waves, Leaf, Moon, Sun, Shield } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  progress?: number
  lessons: number
  image: string
  topics: string[]
  benefits: string[]
  category: "foundation" | "meditation" | "healing" | "advanced" | "mastery"
  instructor: string
  prerequisites?: string[]
}

export const defaultCourses: Course[] = [
  // Foundation Courses
  {
    id: "1",
    title: "Schumann Resonance Fundamentals",
    description: "Discover the science behind Earth's natural frequencies and their profound impact on human consciousness and well-being. Learn how to harness these frequencies for optimal health.",
    duration: "4 hours",
    level: "Beginner",
    progress: 0,
    lessons: 12,
    image: "/courses/schumann-basics.jpg",
    category: "foundation",
    instructor: "Dr. Sarah Chen",
    topics: [
      "Introduction to Earth's Electromagnetic Field",
      "The Discovery of Schumann Resonances",
      "7.83 Hz: The Earth's Heartbeat",
      "Frequency Entrainment Basics",
      "Binaural Beats and Brain States",
      "Practical Applications in Daily Life"
    ],
    benefits: [
      "Understanding of fundamental frequency principles",
      "Connection with Earth's natural rhythms",
      "Enhanced awareness of electromagnetic influences",
      "Practical tools for frequency work"
    ]
  },
  {
    id: "2",
    title: "Sacred Sound Healing",
    description: "Explore ancient and modern sound healing techniques, from Tibetan singing bowls to frequency therapy. Learn how different frequencies affect the body's energy centers.",
    duration: "6 hours",
    level: "Intermediate",
    progress: 0,
    lessons: 15,
    image: "/courses/healing.jpg",
    category: "healing",
    instructor: "Master Li Wei",
    topics: [
      "History of Sound Healing",
      "Solfeggio Frequencies",
      "Chakra Frequencies and Healing",
      "Sound Instruments and Their Effects",
      "Creating Healing Sound Sessions",
      "Integration with Modern Medicine"
    ],
    benefits: [
      "Deep understanding of sound healing",
      "Practical healing techniques",
      "Energy center balancing",
      "Personal transformation tools"
    ]
  },
  {
    id: "3",
    title: "Advanced Meditation with Frequencies",
    description: "Master the art of deep meditation using specific frequencies. Learn to access altered states of consciousness and enhance your spiritual practice.",
    duration: "8 hours",
    level: "Advanced",
    progress: 0,
    lessons: 16,
    image: "/courses/meditation.jpg",
    category: "meditation",
    instructor: "Swami Anandji",
    prerequisites: ["Basic meditation experience", "Understanding of frequencies"],
    topics: [
      "States of Consciousness and Brainwaves",
      "Gamma State Meditation (40Hz)",
      "Theta Healing Techniques",
      "Delta Sleep Enhancement",
      "Kundalini Activation Frequencies",
      "Advanced Energy Work"
    ],
    benefits: [
      "Deeper meditation states",
      "Enhanced spiritual awareness",
      "Improved sleep quality",
      "Higher consciousness access"
    ]
  },
  // Advanced Courses
  {
    id: "4",
    title: "Quantum Frequency Healing",
    description: "Explore cutting-edge research in quantum healing, consciousness, and frequency medicine. Learn advanced techniques for energy healing and cellular regeneration.",
    duration: "10 hours",
    level: "Advanced",
    progress: 0,
    lessons: 20,
    image: "/courses/quantum.jpg",
    category: "advanced",
    instructor: "Dr. Michael Quantum",
    prerequisites: ["Sacred Sound Healing", "Understanding of quantum physics basics"],
    topics: [
      "Quantum Field Theory and Healing",
      "DNA Frequency Activation",
      "Cellular Regeneration Frequencies",
      "Remote Healing Techniques",
      "Timeline Healing",
      "Future of Frequency Medicine"
    ],
    benefits: [
      "Advanced healing abilities",
      "Understanding of quantum healing",
      "DNA activation techniques",
      "Professional practice skills"
    ]
  },
  {
    id: "5",
    title: "Shamanic Frequency Work",
    description: "Bridge ancient shamanic wisdom with modern frequency science. Learn powerful techniques for spiritual healing and consciousness expansion.",
    duration: "12 hours",
    level: "Advanced",
    progress: 0,
    lessons: 18,
    image: "/courses/shamanic.jpg",
    category: "mastery",
    instructor: "Maria Eagle Heart",
    prerequisites: ["Advanced Meditation with Frequencies"],
    topics: [
      "Shamanic Journey Frequencies",
      "Spirit World Connection",
      "Power Animal Frequencies",
      "Earth Healing Ceremonies",
      "Ancestral Frequency Healing",
      "Integration of Modern and Ancient"
    ],
    benefits: [
      "Shamanic healing abilities",
      "Spiritual connection enhancement",
      "Earth healing techniques",
      "Ancient wisdom integration"
    ]
  },
  {
    id: "6",
    title: "Frequency Mastery Program",
    description: "The ultimate mastery program combining all aspects of frequency work. Become a certified practitioner and learn to teach others.",
    duration: "20 hours",
    level: "Master",
    progress: 0,
    lessons: 30,
    image: "/courses/mastery.jpg",
    category: "mastery",
    instructor: "The Council of Masters",
    prerequisites: ["Completion of all advanced courses"],
    topics: [
      "Advanced Energy Mechanics",
      "Teaching Methodologies",
      "Clinical Practice Setup",
      "Research and Development",
      "Ethics and Responsibilities",
      "Future of Frequency Work"
    ],
    benefits: [
      "Complete mastery of frequencies",
      "Teaching certification",
      "Professional practice ready",
      "Advanced healing abilities"
    ]
  }
]

export interface CourseGridProps {
  courses?: Course[]
}

export function CourseGrid({ courses = defaultCourses }: CourseGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <div className="relative aspect-video">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full rounded-t-lg"
              />
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2"
              >
                {course.category}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{course.level}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <CardTitle className="mt-2">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Book className="w-4 h-4 mr-1" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-1" />
                    Certificate
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Key Topics:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-2" />
                        {topic}
                      </li>
                    ))}
                    {course.topics.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{course.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>
                </div>

                {course.prerequisites && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Prerequisites:</h4>
                    <ul className="text-sm text-muted-foreground">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center">
                          <Shield className="w-3 h-3 mr-2" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {typeof course.progress === "number" && (
                  <div className="space-y-2">
                    <Progress value={course.progress} />
                    <p className="text-sm text-muted-foreground">
                      {course.progress}% complete
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/courses/${course.id}`} className="w-full">
                <Button className="w-full">
                  {course.progress ? "Continue Course" : "Start Course"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 