-- supabase/sql/seeds.sql

-- Seed roles
INSERT INTO roles (name, description) VALUES
('admin', 'Platform administrator'),
('moderator', 'Content moderator'),
('vendor', 'Vendor / Business owner'),
('member', 'Regular community member')
ON CONFLICT (name) DO NOTHING;

-- Seed some categories
INSERT INTO categories (slug, title, description) VALUES
('food', 'Food', 'Food vendors and restaurants'),
('desserts', 'Desserts', 'Sweets and desserts'),
('crafts', 'Crafts', 'Handmade goods and crafts'),
('clothing', 'Clothing', 'Apparel and island wear'),
('services', 'Services', 'Local services')
ON CONFLICT (slug) DO NOTHING;

-- Seed example users
INSERT INTO users (id, full_name, display_name, email, bio, role)
VALUES
(gen_random_uuid(), 'Aloha Kealoha', 'Kealoha', 'kealoha@example.com', 'Community organizer', 'admin'),
(gen_random_uuid(), 'Lani Mahoe', 'Lani', 'lani@example.com', 'Vendor - plate lunch', 'vendor'),
(gen_random_uuid(), 'Noa Koa', 'Noa', 'noa@example.com', 'Community member', 'member')
;

-- Seed a location
INSERT INTO locations (id, name, address, city, state, postal_code, country, latitude, longitude)
VALUES
(gen_random_uuid(), 'Paradise Park', '123 Aloha Rd', 'Las Vegas', 'NV', '89101', 'USA', 36.1699, -115.1398)
;

-- Seed example business
WITH owner AS (
  SELECT id FROM users WHERE display_name='Lani' LIMIT 1
), loc AS (
  SELECT id FROM locations LIMIT 1
)
INSERT INTO businesses (id, owner_id, name, slug, description, website, instagram, phone, location_id)
SELECT gen_random_uuid(), owner.id, 'Lani''s Plate Lunch', 'lanis-plate-lunch', 'Authentic island plate lunches and local favorites', 'https://lanis.example', '@lanisplatelunch', '702-555-0101', loc.id
FROM owner, loc
ON CONFLICT DO NOTHING;

-- Attach category to business
INSERT INTO business_categories (business_id, category_id)
SELECT b.id, c.id
FROM businesses b
JOIN categories c ON c.slug = 'food'
WHERE b.slug = 'lanis-plate-lunch'
ON CONFLICT DO NOTHING;

-- Seed an event
INSERT INTO events (id, title, description, host_id, location_id, start_time, end_time)
SELECT gen_random_uuid(), 'Community BBQ', 'Family-friendly BBQ and potluck', u.id, l.id, now() + interval '7 days', now() + interval '7 days' + interval '4 hours'
FROM users u, locations l
WHERE u.display_name = 'Kealoha' AND l.name = 'Paradise Park'
LIMIT 1
;

-- Seed a post
INSERT INTO posts (id, author_id, content)
SELECT gen_random_uuid(), u.id, 'Welcome to the 9th Island community! Share what you''re selling today or upcoming events.'
FROM users u WHERE u.display_name = 'Kealoha' LIMIT 1;

-- Seed marketplace listing
INSERT INTO marketplace_listings (id, seller_id, title, description, price_cents, condition)
SELECT gen_random_uuid(), u.id, 'Vintage Ukulele', 'Good condition, needs a new strap', 7500, 'used'
FROM users u WHERE u.display_name = 'Noa' LIMIT 1;

-- End of seeds

