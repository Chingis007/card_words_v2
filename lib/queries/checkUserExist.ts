"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { authors } from "@/db/schema"

export async function checkUserExist(email: string) {
  const results = await db
    .select()
    .from(authors)
    // .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(authors.email, email))
  // .orderBy(asc(tickets.createdAt))
  if (results.length) {
    return true
  } else {
    return false
  }
}
