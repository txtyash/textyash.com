ALTER TABLE "posts" RENAME COLUMN "content" TO "markdown";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "slug" SET DATA TYPE varchar(72);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE varchar(72);--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "description" varchar(192) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "html" text NOT NULL;