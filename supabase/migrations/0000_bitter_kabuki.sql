CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"display_name" varchar(128),
	"username" varchar(64) NOT NULL,
	"email" varchar(254) NOT NULL,
	"password" varchar(256),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
