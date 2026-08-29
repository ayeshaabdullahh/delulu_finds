import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
const SITE_URL = 'https://delulufinds.me';
function escapeHtml(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function truncate(text, max = 160) {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + '\u2026';
}
function getBaseHtml() {
  const distPath = join(process.cwd(), 'dist', 'index.html');
  try {
    return readFileSync(distPath, 'utf-8');
  } catch {
    return null;
  }
}
function injectMeta(html, { title, description, image, url }) {
  let result = html;

  // Pehle SAB purani individual tags remove karo (globally, /g flag ke sath)
  result = result.replace(/<meta property="og:title"[^>]*>\s*/g, '');
  result = result.replace(/<meta property="og:description"[^>]*>\s*/g, '');
  result = result.replace(/<meta property="og:image"[^>]*>\s*/g, '');
  result = result.replace(/<meta property="og:url"[^>]*>\s*/g, '');
  result = result.replace(/<meta property="og:type"[^>]*>\s*/g, '');
  result = result.replace(/<meta name="twitter:title"[^>]*>\s*/g, '');
  result = result.replace(/<meta name="twitter:description"[^>]*>\s*/g, '');
  result = result.replace(/<meta name="twitter:image"[^>]*>\s*/g, '');
  result = result.replace(/<meta name="twitter:card"[^>]*>\s*/g, '');

  // Ab naya, sahi block ek hi baar insert karo (head ke aakhir mein)
  const metaTags = [
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="product" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  const block = metaTags.join('\n    ');

  result = result.replace(/<\/head>/, `    ${block}\n  </head>`);

  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)} | Delulu Finds</title>`
  );
  result = result.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  return result.replace(/\n\s*\n\s*\n/g, '\n');
}
export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) {
    res.status(400).send('Missing slug');
    return;
  }
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    res.status(500).send('Server configuration error');
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: product, error } = await supabase
    .from('products')
    .select('name, slug, description, image_url')
    .eq('slug', slug)
    .maybeSingle();
  const baseHtml = getBaseHtml();
  if (!baseHtml) {
    res.status(500).send('Build output not found');
    return;
  }
  if (error || !product) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(baseHtml);
    return;
  }
  const description = truncate(
    product.description ||
      'A curated fashion find from Delulu Finds. Shop your vibe with handpicked pieces.',
    160
  );
  const html = injectMeta(baseHtml, {
    title: product.name,
    description,
    image: product.image_url,
    url: `${SITE_URL}/product/${product.slug}`,
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
}