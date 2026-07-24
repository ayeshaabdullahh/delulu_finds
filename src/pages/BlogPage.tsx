import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, urlFor, BlogPost } from '../lib/sanity';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllPosts()
      .then((data) => { setPosts(data); setError(false); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);
  const featuredCover = featured?.coverImage ? urlFor(featured.coverImage).width(1400).url() : '';
  const featuredDate = featured ? new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">
            The Journal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal mb-4 leading-tight">
            Style Notes & <span className="text-mauve italic">Stories</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-md mx-auto font-body">
            Trends, tips, and the stories behind our favorite finds
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="w-8 h-8 border-2 border-mauve border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted text-sm font-body">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-muted font-body mb-4">Couldn't load stories right now.</p>
            <Link to="/" className="clay-button text-xs tracking-widest uppercase">Back Home</Link>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted font-body">No stories published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link to={`/blog/${featured.slug.current}`} className="group block mb-16">
                <div className="glass-card glass-card-hover rounded-3xl overflow-hidden grid lg:grid-cols-2 gap-0">
                  <div className="relative h-72 sm:h-96 lg:h-full overflow-hidden min-h-[320px]">
                    <img
                      src={featuredCover}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-[11px] tracking-[0.15em] uppercase font-bold bg-white/80 backdrop-blur-sm text-mauve rounded-full px-4 py-1.5 font-body">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">Featured</span>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4 leading-tight group-hover:text-mauve transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 font-body line-clamp-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-muted/60 text-xs font-body">{featuredDate}</span>
                      <span className="text-mauve font-bold text-xs tracking-wider uppercase font-body group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Story →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of remaining posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
