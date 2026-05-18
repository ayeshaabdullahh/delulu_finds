import { Product } from '../../lib/supabase';
import { Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentProductsProps {
  products: Product[];
}

export default function RecentProducts({ products }: RecentProductsProps) {
  const recent = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-semibold text-charcoal">Recently Added</h3>
        <Clock size={16} className="text-blush-300" />
      </div>
      <div className="space-y-3">
        {recent.map((product) => (
          <div key={product.id} className="flex items-center gap-3 group">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.slug}`} className="text-xs font-bold text-gray-600 hover:text-blush-400 transition-colors font-body truncate block">
                {product.name}
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-300 font-body">{product.category}</span>
                <span className="text-[10px] text-blush-400 font-bold font-body">{product.price}</span>
              </div>
            </div>
            <a
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-blush-100/50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Visit affiliate link"
            >
              <ExternalLink size={12} className="text-blush-300" />
            </a>
          </div>
        ))}
      </div>
      {recent.length === 0 && (
        <p className="text-gray-300 text-xs font-body text-center py-4">No products yet</p>
      )}
    </div>
  );
}
