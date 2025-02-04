"use server"
import { eq, asc } from "drizzle-orm"
import { decks } from "@/db/schema"
import { db } from "@/db"

export async function getDeckById(id: number) {
  const results = await db
    .select()
    .from(decks)
    // .leftJoin(customers, eq(tickets.customeremail, customers.email))
    .where(eq(decks.id, id))
  // .orderBy(asc(tickets.createdAt))
  return results[0]
}
