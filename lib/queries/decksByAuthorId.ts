"use server"
import { db } from "@/db"
import { authors, decks } from "@/db/schema"
import { eq, asc } from "drizzle-orm"

export async function decksByAuthorId(id: number) {
  const results = await db
    .select({
      id: decks.id,
      image: decks.image,
      name: decks.name,
      description: decks.description,
      primeLanguage: decks.primeLanguage,
      secondaryLanguge: decks.secondaryLanguge,
      saved: decks.saved,
      ownerId: decks.ownerId,
      createdAt: decks.createdAt,
      updatedAt: decks.updatedAt,
    })
    .from(decks)
    .leftJoin(authors, eq(authors.id, decks.ownerId))
    .where(eq(authors.id, id))
  return results
}
