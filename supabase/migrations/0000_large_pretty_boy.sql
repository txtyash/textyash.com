CREATE TABLE IF NOT EXISTS "posts" (
	"slug" varchar(64) PRIMARY KEY NOT NULL,
	"title" varchar(64) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"last_edit" timestamp DEFAULT now(),
	"read_time" smallint
);
