ALTER TABLE "posts" ALTER COLUMN "read_time" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_title_unique" UNIQUE("title");