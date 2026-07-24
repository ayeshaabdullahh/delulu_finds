import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRecentPosts, BlogPost } from '../lib/sanity';
import BlogCard from './BlogCard';

export default function JournalSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentPosts(3)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white" id="journal">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-mauve/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-charcoal/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-muted font-bold mb-3 font-body">
              From the Journal
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal leading-tight">
              Style Notes & <span className="text-mauve italic">Stories</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-mauve font-bold text-xs tracking-widest uppercase font-body hover:gap-3 transition-all"
          >
            View All Posts
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-mauve border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
