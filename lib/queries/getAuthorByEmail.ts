"use server"
import { eq, asc } from "drizzle-orm"
import { authors } from "@/db/schema"
import { db } from "@/db"

export async function getAuthorByEmail(email: string) {
  const results = await db
    .select()
    .from(authors)
    // .leftJoin(customers, eq(tickets.customeremail, customers.email))
    .where(eq(authors.email, email))
  // .orderBy(asc(tickets.createdAt))
  return results[0]
}
