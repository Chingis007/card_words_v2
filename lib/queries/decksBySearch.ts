"use server"
import { eq, asc } from "drizzle-orm"

export async function decksBySearch(search: string) {
  // const results = await db
  //   .select()
  //   .from(authors)
  //   // .leftJoin(customers, eq(tickets.customerId, customers.id))
  //   .where(eq(authors.id, id))
  // // .orderBy(asc(tickets.createdAt))
  // return results[0]
  return [98, 0]
}
