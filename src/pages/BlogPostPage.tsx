import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { getPostBySlug, urlFor, BlogPost } from '../lib/sanity';
import { Product, getProductBySlug } from '../lib/supabase';
import PortableTextRenderer from '../components/PortableTextRenderer';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoading(true);
    setError(false);
    setRelatedProduct(null);
    getPostBySlug(slug)
      .then(async (p) => {
        setPost(p);
        if (p?.relatedProductSlug) {
          try {
            const product = await getProductBySlug(p.relatedProductSlug);
            setRelatedProduct(product);
          } catch { /* ignore */ }
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
        <div className="w-8 h-8 border-2 border-mauve border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">Story Not Found</h2>
          <Link to="/blog" className="clay-button text-xs tracking-widest uppercase">Back to Journal</Link>
        </div>
      </div>
    );
  }

  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1600).url() : '';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Split content to insert product card after intro paragraph
  const introParagraph = post.content?.find((block: any) => block._type === 'block' && block.style === 'normal');
  const introIndex = post.content?.indexOf(introParagraph) ?? -1;
  const beforeProduct = introIndex >= 0 ? post.content.slice(0, introIndex + 1) : post.content;
  const afterProduct = introIndex >= 0 ? post.content.slice(introIndex + 1) : [];

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-body mb-6">
          <Link to="/" className="text-muted hover:text-mauve transition-colors">Home</Link>
          <ChevronRight size={12} className="text-muted/40" />
          <Link to="/blog" className="text-muted hover:text-mauve transition-colors">Journal</Link>
          <ChevronRight size={12} className="text-muted/40" />
          <span className="text-mauve font-bold line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Full-width cover image */}
      <div className="relative w-full h-64 sm:h-96 lg:h-[480px] overflow-hidden mb-12">
        {coverUrl && (
          <img src={coverUrl} alt={post.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-mauve font-bold mb-4 font-body">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-muted/70 text-xs font-body tracking-wide">{date}</p>
        </div>

        {/* Excerpt as intro */}
        {post.excerpt && (
          <p className="font-display text-xl sm:text-2xl text-charcoal/70 italic leading-relaxed mb-10 text-center">
            {post.excerpt}
          </p>
        )}

        {/* Content before product card */}
        <div className="prose prose-lg max-w-none">
          <PortableTextRenderer content={beforeProduct} />
        </div>

        {/* Shop The Look card */}
        {relatedProduct && (
          <div className="my-10">
            <div className="glass-card rounded-3xl overflow-hidden grid sm:grid-cols-2 gap-0">
              <div className="relative h-56 sm:h-full overflow-hidden min-h-[240px]">
                <img
                  src={relatedProduct.image_url}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">Shop The Look</span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mb-2 leading-tight">
                  {relatedProduct.name}
                </h3>
                <p className="text-mauve font-bold text-lg mb-4 font-body">{relatedProduct.price}</p>
                <div className="flex items-center gap-3">
                  <Link to={`/product/${relatedProduct.slug}`} className="clay-button text-xs tracking-widest uppercase flex items-center gap-2">
                    View Product
                    <ExternalLink size={12} />
                  </Link>
                  <a
                    href={relatedProduct.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="clay-button-outline text-xs tracking-widest uppercase"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content after product card */}
        <div className="prose prose-lg max-w-none">
          <PortableTextRenderer content={afterProduct} />
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-mauve/10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-mauve font-bold text-xs tracking-widest uppercase font-body hover:gap-3 transition-all">
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </div>
      </article>
    </div>
  );
}
