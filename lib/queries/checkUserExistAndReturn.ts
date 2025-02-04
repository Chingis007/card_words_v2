"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { authors } from "@/db/schema"

export async function checkUserExistAndReturn(email: string) {
  const results = await db
    .select({
      id: authors.id,
      image: authors.image,
      username: authors.username,
      email: authors.email,
      bio: authors.bio,
      savedDecks: authors.savedDecks,
    })
    .from(authors)
    // .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(authors.email, email))
  // .orderBy(asc(tickets.createdAt))

  return results[0]
}
