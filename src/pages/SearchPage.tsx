import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ExternalLink, Search } from 'lucide-react';
import { Product, getProducts } from '../lib/supabase';
import { useSavedItems } from '../hooks/useSavedItems';

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

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { savedIds, toggleSave } = useSavedItems();

  useEffect(() => {
    if (!query) { setProducts([]); return; }
    setLoading(true);
    getProducts({ search: query })
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search size={24} className="text-blush-300" />
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal">
              Results for "<span className="text-gradient">{query}</span>"
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-body">{products.length} finds</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-blush-200 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300 text-sm font-body">Searching...</p>
          </div>
        ) : products.length === 0 && query ? (
          <div className="text-center py-16">
            <p className="text-gray-300 font-body mb-4">No finds matching "{query}"</p>
            <Link to="/explore" className="clay-button text-xs tracking-widest uppercase">Browse All Finds</Link>
          </div>
        ) : (
          <div className="masonry-grid">
            {products.map((product) => (
              <div key={product.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden group">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`absolute top-3 left-3 source-badge ${sourceBadgeClass(product.source)}`}>{sourceLabel(product.source)}</span>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(product.id); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    aria-label={savedIds.has(product.id) ? 'Unsave' : 'Save'}
                  >
                    <Heart size={14} className={savedIds.has(product.id) ? 'text-blush-400 fill-blush-400' : 'text-blush-400'} fill={savedIds.has(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`} className="font-display text-sm font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">{product.name}</Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blush-400 font-bold text-sm font-body">{product.price}</span>
                    <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="clay-button !py-1.5 !px-4 !text-[10px] flex items-center gap-1">
                      <ExternalLink size={10} />
                      Shop
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
