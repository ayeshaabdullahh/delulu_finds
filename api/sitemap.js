import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://delulufinds.me';

const STATIC_PAGES = [
  { loc: '/', priority: '1.0' },
  { loc: '/explore', priority: '0.9' },
  { loc: '/blog', priority: '0.9' },
  { loc: '/search', priority: '0.6' },
  { loc: '/saved', priority: '0.4' },
  { loc: '/about', priority: '0.5' },
  { loc: '/disclosure', priority: '0.3' },
  { loc: '/privacy', priority: '0.3' },
  { loc: '/contact', priority: '0.5' },
];

const CATEGORIES = [
  'Clothing', 'Shoes', 'Bags', 'Jewelry', 'Accessories',
  'Beauty', 'Nails', 'Swimwear', 'Abayas', 'Scarves',
];

function urlEntry(loc, priority, lastmod) {
  let entry = '  <url>\n    <loc>' + loc + '</loc>';
  if (lastmod) entry += '\n    <lastmod>' + lastmod + '</lastmod>';
  entry += '\n    <priority>' + priority + '</priority>\n  </url>';
  return entry;
}

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  const entries = [];

  for (const page of STATIC_PAGES) {
    entries.push(urlEntry(SITE_URL + page.loc, page.priority, null));
  }

  for (const cat of CATEGORIES) {
    entries.push(urlEntry(SITE_URL + '/explore?category=' + cat, '0.7', null));
  }

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: products, error } = await supabase
      .from('products')
      .select('slug, updated_at')
      .order('slug', { ascending: true });

    if (!error && products) {
      for (const p of products) {
        const lastmod = p.updated_at
          ? new Date(p.updated_at).toISOString().split('T')[0]
          : null;
        entries.push(urlEntry(SITE_URL + '/product/' + p.slug, '0.8', lastmod));
      }
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join('\n') +
    '\n</urlset>';

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate');
  res.status(200).send(xml);
}
