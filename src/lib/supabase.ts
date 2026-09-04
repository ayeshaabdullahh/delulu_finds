import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  affiliate_url: string;
  price: string;
  original_price: string | null;
  source: string;
  category: string;
  aesthetic_tags: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SavedItem = {
  id: string;
  user_session: string;
  product_id: string;
  created_at: string;
  product?: Product;
};

const SESSION_KEY = 'delulu_session_id';
let sessionInitialized = false;

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function ensureSession(): Promise<void> {
  if (sessionInitialized) return;
  const sessionId = getSessionId();
  const { error } = await supabase.rpc('set_user_session', { session_id: sessionId });
  if (!error) sessionInitialized = true;
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  newArrival?: boolean;
  latest?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*');
  if (options?.latest) {
    query = query.order('created_at', { ascending: false });
  } else if (options?.newArrival) {
    query = query.order('created_at', { ascending: false });
  } else {
    query = query
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
  }

  if (options?.category && options.category !== 'All') {
    query = query.eq('category', options.category);
  }
  if (options?.featured) {
    query = query.eq('is_featured', true);
  }
  if (options?.newArrival) {
    query = query.eq('is_new_arrival', true);
  }
  if (options?.search) {
    const safeSearch = options.search.replace(/[%_]/g, '\\$&');
    query = query.or(`name.ilike.%${safeSearch}%,description.ilike.%${safeSearch}%,category.ilike.%${safeSearch}%`);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  if (!slugs.length) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('slug', slugs);
  if (error) throw error;
  return (data || []) as Product[];
}

export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', productId);
  if (error) throw error;
  return (data || []) as Product[];
}

export async function saveProduct(productId: string): Promise<boolean> {
  await ensureSession();
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('saved_items')
    .insert({ user_session: sessionId, product_id: productId });
  return !error;
}

export async function unsaveProduct(productId: string): Promise<boolean> {
  await ensureSession();
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_session', sessionId)
    .eq('product_id', productId);
  return !error;
}

export async function getSavedProductIds(): Promise<string[]> {
  await ensureSession();
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('saved_items')
    .select('product_id')
    .eq('user_session', sessionId);
  if (error) return [];
  return (data || []).map((d) => d.product_id);
}

export async function getSavedProducts(): Promise<(SavedItem & { product: Product })[]> {
  await ensureSession();
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('saved_items')
    .select('*, product:products(*)')
    .eq('user_session', sessionId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []) as (SavedItem & { product: Product })[];
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email });
  return !error;
}

export async function signInAsAdmin(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}
