import { db } from './index';
import { users, journalEntries, courses, userCourseProgress, userActivities } from './schema';
import { eq } from 'drizzle-orm';

// User operations
export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

// Journal operations
export async function createJournalEntry(userId: string, title: string, content: string, mood?: string) {
  return await db.insert(journalEntries).values({
    id: crypto.randomUUID(),
    userId,
    title,
    content,
    mood,
  });
}

export async function getUserJournalEntries(userId: string) {
  return await db.select().from(journalEntries).where(eq(journalEntries.userId, userId));
}

// Course operations
export async function getCourses() {
  return await db.select().from(courses);
}

export async function getUserCourseProgress(userId: string) {
  return await db.select()
    .from(userCourseProgress)
    .where(eq(userCourseProgress.userId, userId));
}

export async function updateCourseProgress(userId: string, courseId: string, progress: number) {
  return await db.update(userCourseProgress)
    .set({ 
      progress,
      completed: progress >= 100,
      lastAccessed: new Date(),
    })
    .where(eq(userCourseProgress.userId, userId) && eq(userCourseProgress.courseId, courseId));
}

// Activity tracking
export async function logUserActivity(userId: string, type: string, description: string) {
  return await db.insert(userActivities).values({
    id: crypto.randomUUID(),
    userId,
    type,
    description,
  });
}

export async function getUserActivities(userId: string) {
  return await db.select()
    .from(userActivities)
    .where(eq(userActivities.userId, userId));
} 