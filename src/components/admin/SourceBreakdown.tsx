import { Product } from '../../lib/supabase';

interface SourceBreakdownProps {
  products: Product[];
}

const sourceConfig: Record<string, { color: string; bg: string }> = {
  Amazon: { color: 'text-amber-600', bg: 'bg-amber-100' },
  Etsy: { color: 'text-orange-600', bg: 'bg-orange-100' },
  Daraz: { color: 'text-rose-600', bg: 'bg-rose-100' },
  ShareASale: { color: 'text-teal-600', bg: 'bg-teal-100' },
};

export default function SourceBreakdown({ products }: SourceBreakdownProps) {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.source] = (counts[p.source] || 0) + 1;
  });

  const total = products.length;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold text-charcoal mb-4">Affiliate Sources</h3>
      <div className="space-y-3">
        {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([source, count]) => {
          const config = sourceConfig[source] || { color: 'text-gray-600', bg: 'bg-gray-100' };
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={source} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <span className={`text-[9px] font-bold ${config.color}`}>{source.slice(0, 3).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-gray-500 font-body">{source}</span>
                  <span className="text-[10px] text-gray-400 font-body">{count} finds ({pct}%)</span>
                </div>
                <div className="h-1.5 rounded-full bg-cream-200/60 overflow-hidden">
                  <div className={`h-full rounded-full ${config.bg} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
