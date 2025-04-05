CREATE TABLE "offerapplys" (
	"id" serial PRIMARY KEY NOT NULL,
	"ownerPostId" integer NOT NULL,
	"senderId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"type" varchar(32) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "offerapplys" ADD CONSTRAINT "offerapplys_ownerPostId_posts_id_fk" FOREIGN KEY ("ownerPostId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offerapplys" ADD CONSTRAINT "offerapplys_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;