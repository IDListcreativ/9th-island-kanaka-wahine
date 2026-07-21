-- supabase/sql/policies.sql

-- Row Level Security (RLS) policy templates
-- IMPORTANT: Review and adapt these policies to your exact auth/claim setup before applying to production.

-- Example: allow public reads on businesses, but restrict writes to business owners and admins
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read" ON businesses
  FOR SELECT
  USING (true);

CREATE POLICY "insert_if_authenticated" ON businesses
  FOR INSERT
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (owner_id = auth.uid()::uuid);

CREATE POLICY "owner_or_admin_update" ON businesses
  FOR UPDATE
  USING (owner_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
  ))
  WITH CHECK (owner_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
  ));

CREATE POLICY "owner_or_admin_delete" ON businesses
  FOR DELETE
  USING (owner_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
  ));

-- Users table: allow users to manage their own profile; admins can view/update
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_public" ON users
  FOR SELECT
  USING (true);

CREATE POLICY "users_manage_own" ON users
  FOR ALL
  USING (id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
  ))
  WITH CHECK (id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
  ));

-- Events: public read; RSVP insert allowed to authenticated users
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_public_read" ON events
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "events_insert_authenticated" ON events
  FOR INSERT
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (host_id = auth.uid()::uuid OR host_id IS NULL);

CREATE POLICY "rsvps_manage_own" ON rsvps
  FOR ALL
  USING (user_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
  ))
  WITH CHECK (user_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
  ));

-- Posts: public read; authors can manage their posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_public_read" ON posts
  FOR SELECT
  USING (NOT is_private);

CREATE POLICY "posts_author_manage" ON posts
  FOR ALL
  USING (author_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
  ))
  WITH CHECK (author_id = auth.uid()::uuid OR (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
  ));

-- Media: allow reads for public, writes for authenticated users
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_public_read" ON media FOR SELECT USING (true);
CREATE POLICY "media_insert_auth" ON media FOR INSERT USING (auth.uid() IS NOT NULL) WITH CHECK (uploaded_by = auth.uid()::uuid);

-- Reviews: allow anyone to read; only authenticated users may insert a review; owners may delete
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_auth" ON reviews FOR INSERT USING (auth.uid() IS NOT NULL) WITH CHECK (user_id = auth.uid()::uuid);
CREATE POLICY "reviews_owner_or_admin_delete" ON reviews FOR DELETE USING (user_id = auth.uid()::uuid OR (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
));

-- Notifications: users may only see their own
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_user_only" ON notifications FOR ALL USING (user_id = auth.uid()::uuid) WITH CHECK (user_id = auth.uid()::uuid);

-- Reports: moderators/admins may view; reporters may create
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_create_authenticated" ON reports FOR INSERT USING (auth.uid() IS NOT NULL) WITH CHECK (reporter_id = auth.uid()::uuid);
CREATE POLICY "reports_view_moderators" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role IN ('admin','moderator'))
);

-- Audit logs: only admins can insert/view (or backend service role)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_admin_only" ON audit_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'admin')
);

-- NOTE: These are templates. You should adapt checks to match how you provision role claims in JWTs
-- and how you synchronize auth.users <-> users.profile table. Supabase sometimes expects
-- policies referencing auth.role() or current_setting('jwt.claims.role'), depending on your setup.

