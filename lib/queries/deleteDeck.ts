"use server"
import { eq, asc } from "drizzle-orm"
import { decks } from "@/db/schema"
import { db } from "@/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDeckById } from "./getDeckById"

export async function deleteDeck(id: number) {
  const session = await auth()
  if (!session) redirect("/")
  if (!session.user) redirect("/")
  const author_id = session.user.id
  const deck = await getDeckById(Number(id))
  if (Number(deck.ownerId) !== Number(author_id))
    throw new Error("Not Authorized to delete deck you does not own")
  const results = await db
    .delete(decks)
    // .leftJoin(customers, eq(tickets.customeremail, customers.email))
    .where(eq(decks.id, id))
    .returning({ deletedId: decks.id })
  // .orderBy(asc(tickets.createdAt))
  return results
}
