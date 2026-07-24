import { Link } from 'react-router-dom';
import { urlFor, BlogPost } from '../lib/sanity';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(800).url() : '';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <Link to={`/blog/${post.slug.current}`} className="group block">
        <div className="glass-card glass-card-hover rounded-2xl overflow-hidden">
          <div className="relative h-44 overflow-hidden">
            {coverUrl && (
              <img
                src={coverUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            )}
            <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase font-bold bg-white/80 backdrop-blur-sm text-mauve rounded-full px-3 py-1 font-body">
              {post.category}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-display text-base font-semibold text-charcoal leading-tight mb-2 group-hover:text-mauve transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted text-xs leading-relaxed line-clamp-2 font-body">{post.excerpt}</p>
            <p className="text-muted/60 text-[10px] mt-2 font-body">{date}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug.current}`} className="group block">
      <div className="glass-card glass-card-hover rounded-2xl overflow-hidden">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          {coverUrl && (
            <img
              src={coverUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}
          <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase font-bold bg-white/80 backdrop-blur-sm text-mauve rounded-full px-3 py-1 font-body">
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-charcoal leading-tight mb-2 group-hover:text-mauve transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed line-clamp-3 font-body">{post.excerpt}</p>
          <p className="text-muted/60 text-[10px] mt-3 font-body">{date}</p>
        </div>
      </div>
    </Link>
  );
}
