CREATE TABLE IF NOT EXISTS "posts" (
	"slug" varchar(64) PRIMARY KEY NOT NULL,
	"title" varchar(64) NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"last_edit" text DEFAULT CURRENT_TIMESTAMP,
	"content" text NOT NULL,
	"read_time" smallint
);
--> statement-breakpoint
DROP TABLE "users";