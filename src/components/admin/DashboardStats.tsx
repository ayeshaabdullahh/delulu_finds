import { Package, Heart, Tag, TrendingUp, Eye, ShoppingBag, Sparkles, Layers } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  color: 'blush' | 'lavender' | 'peach' | 'cream';
}

const colorMap = {
  blush: { bg: 'bg-blush-100/60', icon: 'text-blush-300', value: 'text-blush-500' },
  lavender: { bg: 'bg-lavender-100/60', icon: 'text-lavender-300', value: 'text-lavender-500' },
  peach: { bg: 'bg-peach-100/60', icon: 'text-peach-300', value: 'text-peach-500' },
  cream: { bg: 'bg-cream-200/60', icon: 'text-blush-300', value: 'text-blush-500' },
};

export function StatCard({ icon: Icon, label, value, subtext, color }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
      </div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold font-body mb-1">{label}</p>
      <p className={`text-2xl font-bold ${c.value} font-display`}>{value}</p>
      {subtext && <p className="text-[11px] text-gray-300 mt-1 font-body">{subtext}</p>}
    </div>
  );
}

interface DashboardStatsProps {
  totalProducts: number;
  totalCategories: number;
  totalSources: number;
  totalSaved: number;
  featuredCount: number;
  newArrivalCount: number;
}

export default function DashboardStats({ totalProducts, totalCategories, totalSources, totalSaved, featuredCount, newArrivalCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard icon={Package} label="Total Finds" value={totalProducts} color="blush" />
      <StatCard icon={Layers} label="Categories" value={totalCategories} color="lavender" />
      <StatCard icon={Tag} label="Sources" value={totalSources} color="peach" />
      <StatCard icon={Heart} label="Total Saved" value={totalSaved} subtext="by all users" color="blush" />
      <StatCard icon={Sparkles} label="Featured" value={featuredCount} color="lavender" />
      <StatCard icon={TrendingUp} label="New Arrivals" value={newArrivalCount} color="peach" />
    </div>
  );
}
