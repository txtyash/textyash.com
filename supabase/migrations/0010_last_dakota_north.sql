ALTER TABLE "posts" ALTER COLUMN "imageUrl" SET DEFAULT '/images/default-cover-image.png';--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "imageUrl" SET NOT NULL;