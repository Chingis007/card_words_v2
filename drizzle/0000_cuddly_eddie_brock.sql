-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"bio" varchar NOT NULL,
	"saved_decks" varchar[] DEFAULT '{""}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"originalWord" varchar NOT NULL,
	"originalWordDescription" varchar NOT NULL,
	"translation" varchar NOT NULL,
	"translationDescription" varchar NOT NULL,
	"image" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" varchar NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"prime_language" varchar NOT NULL,
	"secondary_languge" varchar NOT NULL,
	"saved" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

*/