import { defaultCourses } from "@/components/courses/course-grid"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Book, Trophy, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  return defaultCourses.map((course) => ({
    courseId: course.id,
  }))
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = defaultCourses.find(c => c.id === params.courseId)

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Course Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{course.level}</Badge>
            <Badge variant="secondary">{course.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-xl text-muted-foreground">{course.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              {course.lessons} lessons
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Certificate on completion
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Track your journey through the course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={course.progress} />
              <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Content</h2>
          <div className="grid gap-4">
            {course.topics.map((topic, index) => (
              <Link 
                key={index} 
                href={`/courses/${course.id}/lessons/${index + 1}`}
              >
                <Card className="transition-colors hover:bg-accent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {index < (course.progress || 0) / (100 / course.topics.length) ? (
                            <Play className="h-4 w-4 text-primary" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-base">{topic}</CardTitle>
                          <CardDescription>Lesson {index + 1}</CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Course Benefits */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What You'll Learn</h2>
          <div className="grid gap-2">
            {course.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Instructor</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10" />
                <div>
                  <CardTitle>{course.instructor}</CardTitle>
                  <CardDescription>Expert in Frequency Education</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  )
} 