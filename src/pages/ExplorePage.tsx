import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { Product, getProducts } from '../lib/supabase';
import { useSavedItems } from '../hooks/useSavedItems';

const sourceClass = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes('amazon')) return 'source-amazon';
  if (s.includes('etsy')) return 'source-etsy';
  if (s.includes('daraz')) return 'source-daraz';
  if (s.includes('shareasale')) return 'source-shareasale';
  return 'source-amazon';
};

const categories = ['All', 'Tops', 'Dresses', 'Sets', 'Knitwear', 'Bottoms', 'Outerwear', 'Accessories'];
const vibes = ['All', '#CoquetteCore', '#SoftGlamour', '#Y2KVibes', '#CleanGirl', '#Cottagecore', '#OldMoney'];
const priceRanges = ['All', 'Under $25', 'Under $50', 'Under $100', '$100+'];

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [vibe, setVibe] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const { savedIds, toggleSave } = useSavedItems();

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'new') setCategory('All');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    getProducts({ category: category === 'All' ? undefined : category })
      .then((data) => {
        let filtered = data;

        if (vibe !== 'All') {
          filtered = filtered.filter((p) => p.aesthetic_tags?.some((t) => t.toLowerCase().includes(vibe.toLowerCase().replace('#', ''))));
        }

        if (priceRange !== 'All') {
          filtered = filtered.filter((p) => {
            const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
            if (isNaN(price)) return true;
            if (priceRange === 'Under $25') return price < 25;
            if (priceRange === 'Under $50') return price < 50;
            if (priceRange === 'Under $100') return price < 100;
            if (priceRange === '$100+') return price >= 100;
            return true;
          });
        }

        setProducts(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, vibe, priceRange, searchParams]);

  const handleToggleSave = async (productId: string) => {
    await toggleSave(productId);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-blush-300 font-bold mb-3 font-body">
            Explore
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Browse All <span className="text-gradient">Finds</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto font-body">
            Discover curated pieces from your favorite brands and stores
          </p>
        </div>

        {/* Filter toggle (mobile) */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="clay-button-outline !py-2 !px-4 !text-xs flex items-center gap-2 font-body lg:hidden"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <span className="text-gray-400 text-xs font-body">{products.length} finds</span>
        </div>

        {/* Filters */}
        <div className={`mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`clay-button-outline !py-1.5 !px-4 !text-[11px] font-body ${
                      category === cat ? 'bg-blush-200/20 border-blush-200/70 text-blush-400' : ''
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-lavender-300 font-bold font-body block mb-2">Vibe</label>
              <div className="flex flex-wrap gap-2">
                {vibes.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`clay-button-outline !py-1.5 !px-4 !text-[11px] font-body ${
                      vibe === v ? 'bg-lavender-200/20 border-lavender-200/70 text-lavender-400' : ''
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-peach-300 font-bold font-body block mb-2">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((pr) => (
                  <button
                    key={pr}
                    onClick={() => setPriceRange(pr)}
                    className={`clay-button-outline !py-1.5 !px-4 !text-[11px] font-body ${
                      priceRange === pr ? 'bg-peach-200/20 border-peach-200/70 text-peach-400' : ''
                    }`}
                  >
                    {pr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-blush-200 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300 text-sm font-body">Loading finds...</p>
          </div>
        ) : (
          <>
            <div className="masonry-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden group">
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`absolute top-3 left-3 source-badge ${sourceClass(product.source)}`}>{product.source}</span>
                    {product.aesthetic_tags?.[0] && (
                      <span className="absolute top-3 right-12 text-[10px] tracking-wider uppercase font-bold bg-white/70 backdrop-blur-sm text-lavender-400 rounded-full px-3 py-1 font-body">
                        {product.aesthetic_tags[0]}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleSave(product.id); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                      aria-label={savedIds.has(product.id) ? 'Unsave' : 'Save'}
                    >
                      <Heart size={14} className={savedIds.has(product.id) ? 'text-blush-400 fill-blush-400' : 'text-blush-400'} fill={savedIds.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] tracking-wider uppercase font-bold bg-white/70 backdrop-blur-sm text-gray-600 rounded-full px-3 py-1 font-body">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.slug}`} className="font-display text-sm font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">{product.name}</Link>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blush-400 font-bold text-sm font-body">{product.price}</span>
                        {product.original_price && <span className="text-gray-300 text-xs line-through font-body">{product.original_price}</span>}
                      </div>
                      <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="clay-button !py-1.5 !px-4 !text-[10px] flex items-center gap-1">
                        <ExternalLink size={10} />
                        Shop This Look
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-300 font-body">No finds match your filters. Try adjusting them!</p>
              </div>
            )}

            {visibleCount < products.length && (
              <div className="text-center mt-12">
                <button onClick={() => setVisibleCount((c) => c + 12)} className="clay-button tracking-widest uppercase text-xs">
                  Load More Finds
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
