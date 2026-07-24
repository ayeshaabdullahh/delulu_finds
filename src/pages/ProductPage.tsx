import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Heart, ChevronRight, ArrowRight } from 'lucide-react';
import { Product, getProductBySlug, getRelatedProducts } from '../lib/supabase';
import { useSavedItems } from '../hooks/useSavedItems';
import { getPostByProductSlug, urlFor, BlogPost } from '../lib/sanity';

const sourceBadgeClass = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes('awin')) return 'source-awn';
  if (s.includes('impact')) return 'source-imp';
  if (s.includes('mavrly')) return 'source-mvr';
  if (s.includes('daraz')) return 'source-drz';
  return 'source-drz';
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { savedIds, toggleSave } = useSavedItems();

  useEffect(() => {
    if (!slug) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoading(true);
    setBlogPost(null);
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        if (p) {
          getRelatedProducts(p.id, p.category).then(setRelated).catch(() => {});
          getPostByProductSlug(p.slug)
            .then(setBlogPost)
            .catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
        <div className="w-8 h-8 border-2 border-blush-200 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">Find Not Found</h2>
          <Link to="/explore" className="clay-button text-xs tracking-widest uppercase">Browse All Finds</Link>
        </div>
      </div>
    );
  }

  const isSaved = savedIds.has(product.id);

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-body mb-8">
          <Link to="/" className="text-gray-400 hover:text-blush-400 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/explore" className="text-gray-400 hover:text-blush-400 transition-colors">Explore</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-blush-400 font-bold">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          <div className="glass-card rounded-3xl overflow-hidden relative group">
            <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer sponsored">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
              />
            </a>
            <span className={`absolute top-4 left-4 source-badge ${sourceBadgeClass(product.source)}`}>
              {product.source}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-wider uppercase font-bold bg-blush-100/60 text-blush-400 rounded-full px-3 py-1 font-body">
                {product.category}
              </span>
              {product.aesthetic_tags?.map((tag) => (
                <span key={tag} className="text-[10px] tracking-wider uppercase font-bold bg-lavender-100/60 text-lavender-400 rounded-full px-3 py-1 font-body">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
              {product.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-body">
              {product.description || 'A curated find from our favorite collection. Click through to shop this look directly from the source.'}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-blush-400 font-bold text-2xl font-body">${product.price}</span>
              {product.original_price && (
                <span className="text-gray-300 text-lg line-through font-body">{product.original_price}</span>
              )}
            </div>

            <div className="glass-card rounded-xl p-3 mb-6 inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blush-300"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              <span className="text-xs text-gray-500 font-body">Pinned by <span className="font-bold text-blush-400">@TheDeluluDrip</span></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="clay-button tracking-widest uppercase text-xs flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                Shop This Look
              </a>
              <button
                onClick={() => toggleSave(product.id)}
                className={`clay-button-outline tracking-widest uppercase text-xs flex items-center justify-center gap-2 ${
                  isSaved ? 'bg-blush-200/20 border-blush-200/70 text-blush-400' : ''
                }`}
              >
                <Heart size={16} className={isSaved ? 'fill-blush-400' : ''} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Saved' : 'Save Find'}
              </button>
            </div>

            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(product.image_url)}&description=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-blush-400 transition-colors font-body"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Pin It on Pinterest
            </a>
          </div>
        </div>

        {blogPost && (
          <div className="mb-20">
            <div className="glass-card rounded-3xl overflow-hidden grid sm:grid-cols-5 gap-0">
              {blogPost.coverImage && (
                <div className="relative sm:col-span-2 h-48 sm:h-full overflow-hidden min-h-[200px]">
                  <img
                    src={urlFor(blogPost.coverImage).width(600).url()}
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className={`p-6 sm:p-8 flex flex-col justify-center ${blogPost.coverImage ? 'sm:col-span-3' : 'sm:col-span-5'}`}>
                <span className="text-[10px] tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">From the Journal</span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mb-3 leading-tight">
                  {blogPost.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4 font-body line-clamp-3">
                  {blogPost.excerpt}
                </p>
                <Link
                  to={`/blog/${blogPost.slug.current}`}
                  className="inline-flex items-center gap-2 text-mauve font-bold text-xs tracking-widest uppercase font-body hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-8">
              More <span className="text-gradient">Finds</span> You'll Love
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {related.map((p) => (
                <div key={p.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden group">
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block h-40 overflow-hidden"
                  >
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </a>
                  <Link to={`/product/${p.slug}`} className="block p-3">
                    <h3 className="font-display text-xs font-medium text-charcoal line-clamp-1">{p.name}</h3>
                    <span className="text-blush-400 font-bold text-xs font-body">${p.price}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
