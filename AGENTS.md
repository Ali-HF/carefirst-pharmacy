<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Carefirst Pharmacy — Project Setup & Reference Guide

> **IMPORTANT:** This codebase was forked from a stationery e-commerce app called "Notebloom / The Paperworm".
> The business logic (cart, checkout, auth, orders, reviews, admin) is fully functional and must be preserved.
> The UI has been re-themed to match Dvago.pk using Carefirst Pharmacy branding.
> There are still many hardcoded "notebloom" strings throughout the source that need to be renamed over time.

---

## 1. Environment Variables Setup

Create a `.env.local` file at the project root. Every value below must be filled in for the app to work.

### 1.1 Authentication Secret
```
AUTH_SECRET=<generate with: npx auth secret>
NEXTAUTH_URL=http://localhost:3000
```
- `AUTH_SECRET`: A random 32+ character string. Generate one with `npx auth secret` or `openssl rand -base64 32`.
- `NEXTAUTH_URL`: Set to `http://localhost:3000` for local dev, or your production domain for deployment.

### 1.2 Database (Supabase Postgres)
```
DATABASE_URL="postgres://postgres.[PROJECT-ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```
- Create a **new** Supabase project at https://supabase.com/dashboard
- Go to **Settings → Database → Connection String → URI** and copy the **Transaction (port 6543)** connection string.
- Replace `[PASSWORD]` with your database password.
- **CRITICAL:** This must be a FRESH Supabase project. Do NOT reuse the Notebloom/Paperworm database.

### 1.3 Email (Brevo SMTP or Gmail App Password)
```
SMTP_USER=carefirst@yourdomain.com
SMTP_PASSWORD=your_smtp_password
```
- Option A: Use [Brevo](https://www.brevo.com/) (formerly Sendinblue) — create a free account, generate SMTP credentials.
- Option B: Use a Gmail App Password — enable 2FA on a Gmail account, generate an App Password at https://myaccount.google.com/apppasswords

### 1.4 Image Storage (Vercel Blob)
```
BLOB_STORE_ID=store_XXXXXXXXXX
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXX
```
- Go to your Vercel project dashboard → **Storage** → **Create Store** (Blob).
- Copy the `BLOB_READ_WRITE_TOKEN` from the store's settings.

### 1.5 Optional: Error Tracking (Sentry)
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_DSN=<same as above>
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=sntrys_xxx
```

### 1.6 Optional: Analytics (PostHog)
```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## 2. Database Schema Setup

After creating your Supabase project and setting `DATABASE_URL`, run the following SQL in the **Supabase SQL Editor** (Dashboard → SQL Editor → New Query):

```sql
-- ============================================================
-- CAREFIRST PHARMACY — Full Database Schema
-- ============================================================

-- 1. Users
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

-- 2. Products (the table is called "books" for legacy reasons)
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

-- 3. Product Variations (e.g. different pack sizes, strengths)
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
```

### 2.1 Seed the Admin Account

After creating the schema, run this to create your admin user:

```sql
-- Replace the email and password hash with your own.
-- To generate a bcrypt hash: npx -y bcryptjs-cli hash "YourPassword123"
INSERT INTO users (name, email, password_hash, is_admin, email_verified)
VALUES ('Carefirst Admin', 'admin@carefirst.pk', '<YOUR_BCRYPT_HASH>', 1, TRUE)
ON CONFLICT (email) DO NOTHING;
```

---

## 3. Vercel Deployment

### 3.1 Link to Vercel
```bash
npx vercel link
```
- Select the **Carefirst Pharmacy** project (or create a new one).
- This will create a fresh `.vercel/` directory linked to YOUR project.

### 3.2 Set Environment Variables on Vercel
```bash
npx vercel env add AUTH_SECRET production
npx vercel env add DATABASE_URL production
npx vercel env add NEXTAUTH_URL production   # set to your production domain
npx vercel env add SMTP_USER production
npx vercel env add SMTP_PASSWORD production
npx vercel env add BLOB_READ_WRITE_TOKEN production
```

### 3.3 Deploy
```bash
npx vercel --prod
```

---

## 4. Notebloom References That Need Renaming

The following files still contain hardcoded "notebloom" strings from the original codebase.
These are **cosmetic only** and do not break functionality, but should be renamed to "Carefirst" over time.

### Critical (User-Visible)
| File | What to change |
|------|---------------|
| `src/lib/email.ts` | All email templates say "Notebloom". Change logo text, footer, subject lines to "Carefirst Pharmacy". |
| `src/components/Footer.tsx` | Footer says "Notebloom". Update branding. |
| `src/components/Logo.tsx` | Alt text says "Notebloom Logo". |
| `src/components/MobileMenu.tsx` | Contact email is `notebloom50@gmail.com`. Links reference `notebloom_admin_tab_session`. |
| `src/components/SignupForm.tsx` | Login link points to `/notebloom-secure-gate-77`. |
| `src/components/Header.tsx` | Cookie name is `notebloom_cart`. |
| `src/lib/db.ts` | Admin seed uses `admin@notebloom.shop`. Global var is `__notebloomSql`. |
| `src/lib/auth.ts` | Sign-in page is `/notebloom-secure-gate-77`. |
| `src/lib/constants.ts` | GENRES list contains stationery categories (Diaries, Pens, etc.). |
| `package.json` | Package name is `"notebloom"`. |

### Internal (Not User-Visible)
| File | What to change |
|------|---------------|
| `src/lib/toast.ts` | Custom event name is `notebloom-toast`. |
| `src/lib/security.ts` | Fallback secret key contains "notebloom". |
| `src/lib/env.ts` | Default AUTH_SECRET is `notebloom-default-secret`. |
| `src/components/ToastContainer.tsx` | Listens for `notebloom-toast` event. |
| `src/components/LogoutButton.tsx` | Clears `notebloom_admin_tab_session`. |

### Routes to Rename
| Current Route | Suggested Replacement |
|--------------|----------------------|
| `/notebloom-secure-gate-77` | `/carefirst-secure-gate-88` (or similar obfuscated admin login) |

---

## 5. Product Categories

The `genre` field on the `books` table is used for product categories.
Current stationery values in `src/lib/constants.ts` should be replaced with pharmacy categories:

```typescript
export const GENRES = [
  "Medicine",
  "Vitamins",
  "Personal Care",
  "Baby & Mother",
  "Devices",
  "Herbal",
] as const;
```

---

## 6. Key Architecture Notes

- **Database table is called `books`** — this is the legacy name from the stationery store. It stores products. All product CRUD operations go through `src/lib/db.ts`.
- **Price is stored in cents** (`price_cents`). The `formatPrice()` function in `db.ts` formats as `PKR X.XX`.
- **Images use `cover_seed`** — this is a Vercel Blob URL string, not a seed. The `BookCover` component renders it.
- **Auth uses NextAuth v5 beta** with JWT sessions and credentials provider.
- **Admin panel** is at the obfuscated route (currently `/notebloom-secure-gate-77`). Admin users have `is_admin = 1` in the `users` table.
- **Order codes** are prefixed with `NB-` (should be changed to `CF-` for Carefirst).
- **Cart** works for both logged-in users (database) and guests (cookies).
- **The app auto-migrates** on startup — `db.ts` runs migration checks to add missing columns/tables.

---

## 7. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Supabase (using `postgres` npm package) |
| Auth | NextAuth v5 beta (credentials provider) |
| Images | Vercel Blob Storage |
| Email | Brevo SMTP / Gmail SMTP |
| Icons | lucide-react |
| Monitoring | Sentry (optional) |
| Analytics | PostHog (optional) |
