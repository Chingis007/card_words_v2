"use server"
import { eq, asc } from "drizzle-orm"
import { cards } from "@/db/schema"
import { db } from "@/db"

export async function getCardById(id: number) {
  const results = await db
    .select()
    .from(cards)
    // .leftJoin(customers, eq(tickets.customeremail, customers.email))
    .where(eq(cards.id, id))
  // .orderBy(asc(tickets.createdAt))
  return results[0]
}
