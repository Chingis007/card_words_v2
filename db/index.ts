import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

// if (process.env.NODE_ENV === "development") {
//   console.log("loading .env.local")
// }

config({ path: ".env.local" })

// const sql = neon(process.env.DATABASE_URL!)

// logger
// const db = drizzle(sql, { logger: true })
const db = drizzle(neon(process.env.DATABASE_URL!))

export { db }
