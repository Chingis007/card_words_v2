"use server"
import { eq, asc } from "drizzle-orm"
import { authors } from "@/db/schema"
import { db } from "@/db"

export async function getAuthorById(id: number) {
  const results = await db
    .select()
    .from(authors)
    // .leftJoin(customers, eq(tickets.customerid, customers.id))
    .where(eq(authors.id, id))
  // .orderBy(asc(tickets.createdAt))
  return results[0]
}
