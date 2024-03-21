ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("username");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "display_name" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birth_date" date;