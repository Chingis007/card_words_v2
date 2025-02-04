"use server"
import { eq, asc } from "drizzle-orm"
import { cards } from "@/db/schema"
import { db } from "@/db"

export async function getCardsByDeckId(id: number) {
  const results = await db
    .select()
    .from(cards)
    // .leftJoin(customers, eq(tickets.customeremail, customers.email))
    .where(eq(cards.deckId, id))
  // .orderBy(asc(tickets.createdAt))
  return results
}
