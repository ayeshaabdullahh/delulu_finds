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
  price: string | null;
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
    // Escape in order: backslash first (it's PostgREST's escape char), then
    // ILIKE wildcards (%, _) and PostgREST or() syntax chars (commas, parens,
    // and dots) so user input can't break out of the filter clause.
    const safeSearch = options.search
      .replace(/\\/g, '\\\\')
      .replace(/[%_,().]/g, '\\$&');
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
