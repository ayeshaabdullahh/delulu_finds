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

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  newArrival?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

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
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,category.ilike.%${options.search}%`);
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

export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', productId)
    .limit(6);
  if (error) throw error;
  return (data || []) as Product[];
}

export async function saveProduct(productId: string): Promise<boolean> {
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('saved_items')
    .insert({ user_session: sessionId, product_id: productId });
  return !error;
}

export async function unsaveProduct(productId: string): Promise<boolean> {
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_session', sessionId)
    .eq('product_id', productId);
  return !error;
}

export async function getSavedProductIds(): Promise<string[]> {
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('saved_items')
    .select('product_id')
    .eq('user_session', sessionId);
  if (error) return [];
  return (data || []).map((d) => d.product_id);
}

export async function getSavedProducts(): Promise<(SavedItem & { product: Product })[]> {
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('saved_items')
    .select('*, product:products(*)')
    .eq('user_session', sessionId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []) as (SavedItem & { product: Product })[];
}

export async function isProductSaved(productId: string): Promise<boolean> {
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('saved_items')
    .select('id')
    .eq('user_session', sessionId)
    .eq('product_id', productId)
    .maybeSingle();
  if (error) return false;
  return !!data;
}
