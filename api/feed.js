import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://delulufinds.me';

function escapeXml(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822Date(iso) {
  try {
    return new Date(iso).toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

function imageMime(url) {
  const ext = (url || '').split('.').pop().toLowerCase().split('?')[0];
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'image/jpeg';
}

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    res.setHeader('Content-Type', 'application/xml');
    res.status(500).send('<?xml version="1.0"?><rss><channel><title>Error</title></channel></rss>');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, description, image_url, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    res.setHeader('Content-Type', 'application/xml');
    res.status(500).send('<?xml version="1.0"?><rss><channel><title>Error</title></channel></rss>');
    return;
  }

  const items = (products || [])
    .map((p) => {
      const link = `${SITE_URL}/product/${p.slug}`;
      const pubDate = rfc822Date(p.created_at);
      const mime = imageMime(p.image_url);
      return `    <item>
      <title>${escapeXml(p.name)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(p.description || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>${escapeXml(link)}</guid>
      <enclosure url="${escapeXml(p.image_url)}" type="${mime}" />
    </item>`;
    })
    .join('\n');

  const lastBuild = products && products.length
    ? rfc822Date(products[products.length - 1].created_at)
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Delulu Finds - Product Feed</title>
    <link>${SITE_URL}</link>
    <description>Handpicked fashion finds curated with love.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
