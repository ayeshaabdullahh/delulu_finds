import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink } from 'lucide-react';
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

function ProductCard({ product, isSaved, onToggleSave }: { product: Product; isSaved: boolean; onToggleSave: (id: string) => void }) {
  const [bouncing, setBouncing] = useState(false);

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSave(product.id);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden group">
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Source badge */}
        <span className={`absolute top-3 left-3 source-badge ${sourceClass(product.source)}`}>
          {product.source}
        </span>

        {/* Aesthetic tag */}
        {product.aesthetic_tags?.[0] && (
          <span className="absolute top-3 right-12 text-[10px] tracking-wider uppercase font-bold bg-white/70 backdrop-blur-sm text-lavender-400 rounded-full px-3 py-1 font-body">
            {product.aesthetic_tags[0]}
          </span>
        )}

        {/* Heart */}
        <button
          onClick={handleHeart}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 ${
            bouncing ? 'animate-heart-bounce' : ''
          }`}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          <Heart size={14} className={isSaved ? 'text-blush-400 fill-blush-400' : 'text-blush-400'} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Category pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-[10px] tracking-wider uppercase font-bold bg-white/70 backdrop-blur-sm text-gray-600 rounded-full px-3 py-1 font-body">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.slug}`} className="font-display text-sm font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">
          {product.name}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-blush-400 font-bold text-sm font-body">{product.price}</span>
            {product.original_price && (
              <span className="text-gray-300 text-xs line-through font-body">{product.original_price}</span>
            )}
          </div>
          <a
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-button !py-1.5 !px-4 !text-[10px] flex items-center gap-1"
          >
            <ExternalLink size={10} />
            Shop This Look
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MasonryGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('All');
  const { savedIds, toggleSave } = useSavedItems();

  useEffect(() => {
    getProducts({ category: category === 'All' ? undefined : category }).then(setProducts).catch(() => {});
  }, [category]);

  const categories = ['All', 'Tops', 'Dresses', 'Sets', 'Knitwear', 'Bottoms', 'Outerwear', 'Accessories'];

  return (
    <section className="py-20 sm:py-28 relative" id="collections">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-lavender-200/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-peach-200/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-lavender-300 font-bold mb-3 font-body">
            Curated For You
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            The <span className="text-gradient">Edit</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto font-body">
            Handpicked finds from across the internet, curated with love
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`clay-button-outline !py-2 !px-5 !text-xs font-body ${
                category === cat ? 'bg-blush-200/20 border-blush-200/70 text-blush-400' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={savedIds.has(product.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-300 font-body">No finds yet in this category. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
