import { prisma } from './db'

// User operations
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id }
  });
}

// Journal operations
export async function createJournalEntry(userId: string, title: string, content: string, mood?: string) {
  return await prisma.journal.create({
    data: {
      title,
      content,
      mood,
      userId
    }
  });
}

export async function getUserJournalEntries(userId: string) {
  return await prisma.journal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

// Course operations
export async function getCourses() {
  return await prisma.course.findMany();
}

export async function getUserCourseProgress(userId: string) {
  return await prisma.courseProgress.findMany({
    where: { userId },
    include: { course: true }
  });
}

export async function updateCourseProgress(userId: string, courseId: string, progress: number) {
  return await prisma.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    },
    update: {
      progress,
      completed: progress >= 100,
      lastAccessed: new Date()
    },
    create: {
      userId,
      courseId,
      progress,
      completed: progress >= 100,
      lastAccessed: new Date()
    }
  });
}

// Activity tracking
export async function logUserActivity(userId: string, type: string, description: string) {
  return await prisma.activity.create({
    data: {
      type,
      description,
      userId
    }
  });
}

export async function getUserActivities(userId: string) {
  return await prisma.activity.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
} 