/*
  # Fix saved_items RLS with proper session scoping

  1. Create a helper function to set the session variable
  2. Drop the wide-open permissive policies
  3. Create properly scoped policies using current_setting('app.user_session')
  4. Add newsletter_subscribers table
*/

-- Helper function to set the user session variable
CREATE OR REPLACE FUNCTION set_user_session(session_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM set_config('app.user_session', session_id, true);
END;
$$;

-- Grant execute to anon so client can call it
GRANT EXECUTE ON FUNCTION set_user_session(text) TO anon;
GRANT EXECUTE ON FUNCTION set_user_session(text) TO authenticated;

-- Drop the wide-open policies
DROP POLICY IF EXISTS "Anyone can read saved items" ON saved_items;
DROP POLICY IF EXISTS "Anyone can insert saved items" ON saved_items;
DROP POLICY IF EXISTS "Anyone can delete saved items" ON saved_items;

-- Create properly scoped policies
CREATE POLICY "Users can read own saved items"
  ON saved_items FOR SELECT
  TO anon, authenticated
  USING (user_session = current_setting('app.user_session', true));

CREATE POLICY "Users can insert own saved items"
  ON saved_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_session = current_setting('app.user_session', true));

CREATE POLICY "Users can delete own saved items"
  ON saved_items FOR DELETE
  TO anon, authenticated
  USING (user_session = current_setting('app.user_session', true));

-- Create newsletter_subscribers table for functional newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
