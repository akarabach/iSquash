ALTER TABLE "tournament" ADD COLUMN "public" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER POLICY "everyone can read" ON "tournament" RENAME TO "only public, owner";