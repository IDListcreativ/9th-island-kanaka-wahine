# Supabase: schema & seeds

This folder contains a starting Postgres schema, seed data, and RLS policy templates tailored for the 9th Island Community Platform.

Files
- schema.sql — main schema (tables, indexes, materialized view)
- seeds.sql — development seed data (roles, sample users, categories, sample business/event/post/listing)
- policies.sql — Row Level Security (RLS) templates. Review and adapt before using in production.

Quick apply (options)

1) Using Supabase SQL editor
- Open your Supabase project
- Copy & paste `supabase/sql/schema.sql` into the SQL editor and run
- Then run `supabase/sql/seeds.sql` and `supabase/sql/policies.sql` (policies should be applied after tables exist)

2) Using psql with DATABASE_URL
- From your terminal (with psql installed):
  psql "$DATABASE_URL" -f supabase/sql/schema.sql
  psql "$DATABASE_URL" -f supabase/sql/seeds.sql
  psql "$DATABASE_URL" -f supabase/sql/policies.sql

3) Using Supabase CLI migrations (recommended for production)
- Install Supabase CLI: https://supabase.com/docs/guides/cli
- Create migration files and use `supabase db push` or `supabase db remote commit` depending on your workflow

Notes & next steps
- Review policies.sql carefully. These are conservative templates using `auth.uid()::uuid` equality checks and a users.role column; adapt them to your JWT claim setup if you set custom role claims.
- Consider syncing `users.auth_id` with the Supabase Auth users ID after sign-up to link profiles.
- Add appropriate unique constraints, indexes, and full-text search indexes as needed for performance.
- Add storage bucket policies for media files (e.g., 'public' bucket for public images, protected buckets for private media).

If you want, I can now:
- Create a Supabase CLI migration directory and split these files into timestamped migration files.
- Wire up a small backend script that runs the seeds and links auth users to profiles.
- Scaffold the frontend to use these tables (auth flows, simple CRUD pages).

