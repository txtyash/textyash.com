ALTER TABLE "posts" ADD COLUMN "hidden" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "exclusive" boolean DEFAULT false NOT NULL;