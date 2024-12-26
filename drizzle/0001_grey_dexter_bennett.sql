ALTER TABLE "forms" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "form_id" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "edit_form_link" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "db_user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_db_user_id_unique" UNIQUE("db_user_id");