"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { authors } from "@/db/schema"

export async function createNewUser(values: {
  image: string | undefined
  username: string | undefined
  email: string
}) {
  await db.insert(authors).values({
    image: values.image ? values.image : "undefined",
    username: values.username ? values.username : "undefined",
    email: values.email,
    bio: "",
    savedDecks: [],
  })
  console.log("after create user", {
    image: values.image ? values.image : "undefined",
    username: values.username ? values.username : "undefined",
    email: values.email,
    bio: "",
    savedDecks: [],
  })
}
