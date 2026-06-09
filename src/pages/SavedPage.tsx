import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Trash2 } from 'lucide-react';
import { Product, SavedItem, getSavedProducts, unsaveProduct } from '../lib/supabase';

const sourceBadgeClass = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes('awin')) return 'source-awn';
  if (s.includes('impact')) return 'source-imp';
  if (s.includes('mavrly')) return 'source-mvr';
  if (s.includes('daraz')) return 'source-drz';
  return 'source-drz';
};

const sourceLabel = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes('awin')) return 'AWN';
  if (s.includes('impact')) return 'IMP';
  if (s.includes('mavrly')) return 'MVR';
  if (s.includes('daraz')) return 'DRZ';
  return source;
};

export default function SavedPage() {
  const [items, setItems] = useState<(SavedItem & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getSavedProducts();
      setItems(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const handleRemove = async (productId: string) => {
    await unsaveProduct(productId);
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-blush-300 font-bold mb-3 font-body">
            Your Collection
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Saved <span className="text-gradient">Finds</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto font-body">
            All the pieces you've hearted, ready to shop whenever you're ready
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-blush-200 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300 text-sm font-body">Loading your saved finds...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="text-blush-100 mx-auto mb-4" />
            <p className="text-gray-300 font-body mb-4">No saved finds yet. Start hearting pieces you love!</p>
            <Link to="/explore" className="clay-button text-xs tracking-widest uppercase">Browse Finds</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Link to={`/product/${item.product.slug}`}>
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  </Link>
                  <span className={`absolute top-3 left-3 source-badge ${sourceBadgeClass(item.product.source)}`}>{sourceLabel(item.product.source)}</span>
                  <button
                    onClick={() => handleRemove(item.product_id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-all shadow-sm"
                    aria-label="Remove from saved"
                  >
                    <Trash2 size={14} className="text-red-300" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.product.slug}`} className="font-display text-sm font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">
                    {item.product.name}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blush-400 font-bold text-sm font-body">{item.product.price}</span>
                    <a href={item.product.affiliate_url} target="_blank" rel="noopener noreferrer" className="clay-button !py-1.5 !px-4 !text-[10px] flex items-center gap-1">
                      <ExternalLink size={10} />
                      Shop This Look
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
