"use server"
import { db } from "@/db"
import { authors, decks } from "@/db/schema"
import { eq, asc } from "drizzle-orm"

export async function decksByAuthorEmail(email: string) {
  const results = await db
    .select()
    .from(decks)
    .leftJoin(authors, eq(authors.id, decks.ownerId))
    .where(eq(authors.email, email))
  return results
}
