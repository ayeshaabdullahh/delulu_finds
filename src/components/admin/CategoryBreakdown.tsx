import { Product } from '../../lib/supabase';

interface CategoryBreakdownProps {
  products: Product[];
}

const categoryColors: Record<string, string> = {
  Tops: 'bg-blush-200',
  Dresses: 'bg-lavender-200',
  Sets: 'bg-peach-200',
  Knitwear: 'bg-blush-300',
  Bottoms: 'bg-lavender-300',
  Outerwear: 'bg-peach-300',
  Accessories: 'bg-blush-100',
};

export default function CategoryBreakdown({ products }: CategoryBreakdownProps) {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted.length > 0 ? sorted[0][1] : 1;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold text-charcoal mb-4">Category Breakdown</h3>
      <div className="space-y-3">
        {sorted.map(([category, count]) => (
          <div key={category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500 font-body">{category}</span>
              <span className="text-xs font-bold text-blush-400 font-body">{count} finds</span>
            </div>
            <div className="h-2 rounded-full bg-cream-200/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${categoryColors[category] || 'bg-blush-200'}`}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
