ALTER TABLE "posts" DROP CONSTRAINT "posts_slug_unique";--> statement-breakpoint
ALTER TABLE "posts" ADD PRIMARY KEY ("slug");--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "id";