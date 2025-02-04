// Relations
// export const deckUserRelations = relations(decks, ({ one }) => ({
//   author: one(authors),
// }))
// export const userDeckRelations = relations(authors, ({ many }) => ({
//   author: many(decks),
// }))
// export const deckCardsRelations = relations(decks, ({ many }) => ({
//   cards: many(cards),
// }))
// export const cardsDeckRelations = relations(cards, ({ one }) => ({
//   cards: one(decks),
// }))
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const authors = pgTable("authors", {
  id: serial().primaryKey().notNull(),
  image: varchar().notNull(),
  username: varchar().notNull(),
  email: varchar().notNull(),
  bio: varchar().notNull(),
  savedDecks: varchar("saved_decks").array().default([""]).notNull(),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
})

export const cards = pgTable("cards", {
  id: serial().primaryKey().notNull(),
  originalWord: varchar().notNull(),
  originalWordDescription: varchar().notNull(),
  translation: varchar().notNull(),
  translationDescription: varchar().notNull(),
  image: varchar().notNull(),
  deckId: integer().notNull(),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
})

export const decks = pgTable("decks", {
  id: serial().primaryKey().notNull(),
  image: varchar().notNull(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  primeLanguage: varchar("prime_language").notNull(),
  secondaryLanguge: varchar("secondary_languge").notNull(),
  saved: varchar().notNull(),
  ownerId: integer().notNull(),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
})
