-- ============================================================
-- CAREFIRST PHARMACY — Schema Migration
-- ============================================================
-- Creates the tables the Notebloom codebase expects and
-- migrates all 1,650 products from `products` → `books`.
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor).
-- ============================================================

-- 1. Users (the app's own auth, separate from Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin INTEGER DEFAULT 0,
  saved_shipping_json TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  verification_token_expires TIMESTAMP,
  reset_token TEXT,
  reset_token_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products table (called "books" for legacy reasons)
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  genre TEXT NOT NULL DEFAULT 'Medicine',
  price_cents INTEGER NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  isbn TEXT DEFAULT '',
  cover_seed TEXT DEFAULT '',
  cover_seed_2 TEXT,
  color_images TEXT,
  weight_grams INTEGER NOT NULL DEFAULT 200,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Variations
CREATE TABLE IF NOT EXISTS book_variations (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  images TEXT NOT NULL DEFAULT '[]',
  UNIQUE (book_id, name)
);

-- 4. Cart
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  color TEXT NOT NULL DEFAULT '',
  UNIQUE (user_id, book_id, color)
);

-- 5. Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_code TEXT UNIQUE,
  user_id INTEGER NOT NULL REFERENCES users(id),
  total_cents INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending',
  shipping_json TEXT,
  payment_method TEXT DEFAULT 'cod',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  price_cents INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  cover_seed TEXT DEFAULT '',
  color TEXT
);

-- 7. Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (book_id, user_id)
);

-- 8. OTP Rate Limiting
CREATE TABLE IF NOT EXISTS otp_resend_limits (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  attempts INTEGER DEFAULT 1,
  last_attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- MIGRATE PRODUCTS → BOOKS
-- ============================================================
-- Maps:  name → title,  brand → author,  category_name → genre
--        price (PKR) → price_cents (multiply by 100)
--        pack_size → description,  image → cover_seed
--        in_stock → stock (true=100, false=0)
-- ============================================================

INSERT INTO books (title, author, description, genre, price_cents, stock, isbn, cover_seed, created_at)
SELECT
  p.name,
  COALESCE(p.brand, ''),
  COALESCE(p.pack_size, ''),
  COALESCE(p.category_name, 'Medicine'),
  ROUND(p.price * 100)::INTEGER,
  CASE WHEN p.in_stock = true THEN 100 ELSE 0 END,
  '',
  COALESCE(p.image, ''),
  p.created_at
FROM products p
ORDER BY p.created_at ASC;

-- ============================================================
-- VERIFY
-- ============================================================
SELECT 'Migration complete!' AS status,
       (SELECT COUNT(*) FROM books) AS books_count,
       (SELECT COUNT(*) FROM products) AS products_count;
