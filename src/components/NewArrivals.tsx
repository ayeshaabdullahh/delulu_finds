import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Heart } from 'lucide-react';
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

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { savedIds, toggleSave } = useSavedItems();

  useEffect(() => {
    getProducts({ newArrival: true, limit: 12 }).then(setProducts).catch(() => {});
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-peach-200/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-peach-300 font-bold mb-2 font-body">
              Just Dropped
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal">
              New <span className="text-gradient">Arrivals</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-white/60 transition-all" aria-label="Scroll left">
              <ChevronLeft size={16} className="text-blush-400" />
            </button>
            <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-white/60 transition-all" aria-label="Scroll right">
              <ChevronRight size={16} className="text-blush-400" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex-shrink-0 w-[200px] sm:w-[220px] group"
            >
              <div className="relative h-56 overflow-hidden">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </Link>
                <span className={`absolute top-2 left-2 source-badge ${sourceBadgeClass(product.source)}`}>
                  {sourceLabel(product.source)}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(product.id); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  aria-label={savedIds.has(product.id) ? 'Unsave' : 'Save'}
                >
                  <Heart size={12} className={savedIds.has(product.id) ? 'text-blush-400 fill-blush-400' : 'text-blush-400'} fill={savedIds.has(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="p-3">
                <Link to={`/product/${product.slug}`} className="font-display text-xs font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-blush-400 font-bold text-xs font-body">{product.price}</span>
                  <a
                    href={product.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-button !py-1 !px-3 !text-[9px] flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={8} />
                    Shop
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/explore?filter=new" className="clay-button-outline tracking-widest uppercase text-xs inline-block">
            View All New Finds
          </Link>
        </div>
      </div>
    </section>
  );
}
