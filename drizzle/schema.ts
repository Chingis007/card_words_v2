import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const authors = pgTable("authors", {
	id: serial().primaryKey().notNull(),
	image: varchar().notNull(),
	username: varchar().notNull(),
	email: varchar().notNull(),
	bio: varchar().notNull(),
	savedDecks: varchar("saved_decks").array().default([""]).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const cards = pgTable("cards", {
	id: serial().primaryKey().notNull(),
	originalWord: varchar().notNull(),
	originalWordDescription: varchar().notNull(),
	translation: varchar().notNull(),
	translationDescription: varchar().notNull(),
	image: varchar().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const decks = pgTable("decks", {
	id: serial().primaryKey().notNull(),
	image: varchar().notNull(),
	name: varchar().notNull(),
	description: varchar().notNull(),
	primeLanguage: varchar("prime_language").notNull(),
	secondaryLanguge: varchar("secondary_languge").notNull(),
	saved: varchar().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});
