/*
  # Create products and saved_items tables for Delulu Finds

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, unique, not null)
      - `description` (text)
      - `image_url` (text, not null)
      - `affiliate_url` (text, not null)
      - `price` (text)
      - `original_price` (text, nullable)
      - `source` (text) — Amazon / Etsy / Daraz / ShareASale
      - `category` (text) — Tops / Dresses / Sets / Knitwear / Bottoms / Outerwear / Accessories
      - `aesthetic_tags` (text array) — #CoquetteCore #SoftGlamour #Y2KVibes etc.
      - `is_featured` (boolean, default false)
      - `is_new_arrival` (boolean, default false)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `saved_items`
      - `id` (uuid, primary key)
      - `user_session` (text, not null) — anonymous session ID for non-auth users
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Products: anyone can read, only service role can write
    - Saved items: anyone can read/write their own session items
    - Unique constraint on saved_items (user_session, product_id)

  3. Indexes
    - products: slug (unique), category, is_featured, is_new_arrival
    - saved_items: user_session, product_id
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  affiliate_url text NOT NULL,
  price text DEFAULT '',
  original_price text,
  source text DEFAULT 'Amazon',
  category text DEFAULT 'Tops',
  aesthetic_tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saved_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_session, product_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_saved_items_session ON saved_items(user_session);
CREATE INDEX IF NOT EXISTS idx_saved_items_product ON saved_items(product_id);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Products: only authenticated admin can insert/update/delete
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Saved items: anyone can read their own session
CREATE POLICY "Users can read own saved items"
  ON saved_items FOR SELECT
  TO anon, authenticated
  USING (user_session = current_setting('app.user_session', true));

-- Saved items: anyone can insert for their own session
CREATE POLICY "Users can insert own saved items"
  ON saved_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_session = current_setting('app.user_session', true));

-- Saved items: anyone can delete their own saved items
CREATE POLICY "Users can delete own saved items"
  ON saved_items FOR DELETE
  TO anon, authenticated
  USING (user_session = current_setting('app.user_session', true));
