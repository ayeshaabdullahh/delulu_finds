import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Search, ExternalLink, Eye, Star, ArrowUpDown } from 'lucide-react';
import { Product } from '../../lib/supabase';

const sourceClass = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes('amazon')) return 'source-amazon';
  if (s.includes('etsy')) return 'source-etsy';
  if (s.includes('daraz')) return 'source-daraz';
  if (s.includes('shareasale')) return 'source-shareasale';
  return 'source-amazon';
};

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

type SortKey = 'name' | 'price' | 'category' | 'source' | 'created_at';

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortAsc, setSortAsc] = useState(false);

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const sources = ['All', ...new Set(products.map((p) => p.source))];

  const filtered = products
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (sourceFilter !== 'All' && p.source !== sourceFilter) return false;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'price') {
        cmp = parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      } else if (sortKey === 'created_at') {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      return sortAsc ? cmp : -cmp;
    });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Filters */}
      <div className="p-4 sm:p-5 border-b border-blush-100/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search finds..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/60 border border-blush-100/50 text-xs font-body focus:outline-none focus:border-blush-200/70"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/60 border border-blush-100/50 text-xs font-body focus:outline-none focus:border-blush-200/70"
          >
            {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/60 border border-blush-100/50 text-xs font-body focus:outline-none focus:border-blush-200/70"
          >
            {sources.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>)}
          </select>
        </div>
        <p className="text-[10px] text-gray-300 mt-2 font-body">{filtered.length} of {products.length} finds</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blush-100/20">
              {[
                { key: 'name' as SortKey, label: 'Product' },
                { key: 'source' as SortKey, label: 'Source' },
                { key: 'category' as SortKey, label: 'Category' },
                { key: 'price' as SortKey, label: 'Price' },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="text-left p-3 sm:p-4 text-[10px] tracking-[0.15em] uppercase text-blush-300 font-bold font-body cursor-pointer hover:text-blush-400 transition-colors select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown size={10} className={sortKey === col.key ? 'text-blush-400' : 'text-gray-200'} />
                  </span>
                </th>
              ))}
              <th className="text-left p-3 sm:p-4 text-[10px] tracking-[0.15em] uppercase text-blush-300 font-bold font-body">Status</th>
              <th className="text-right p-3 sm:p-4 text-[10px] tracking-[0.15em] uppercase text-blush-300 font-bold font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-blush-100/10 hover:bg-blush-50/30 transition-colors">
                <td className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <Link to={`/product/${p.slug}`} className="font-display text-xs font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1 block">
                        {p.name}
                      </Link>
                      <a
                        href={p.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gray-300 hover:text-blush-300 transition-colors font-body flex items-center gap-1"
                      >
                        <ExternalLink size={8} />
                        Affiliate link
                      </a>
                    </div>
                  </div>
                </td>
                <td className="p-3 sm:p-4">
                  <span className={`source-badge ${sourceClass(p.source)}`}>{p.source}</span>
                </td>
                <td className="p-3 sm:p-4 text-xs text-gray-500 font-body">{p.category}</td>
                <td className="p-3 sm:p-4">
                  <span className="text-sm font-bold text-blush-400 font-body">{p.price}</span>
                  {p.original_price && (
                    <span className="text-[10px] text-gray-300 line-through ml-1 font-body">{p.original_price}</span>
                  )}
                </td>
                <td className="p-3 sm:p-4">
                  <div className="flex gap-1">
                    {p.is_featured && (
                      <span className="inline-flex items-center gap-0.5 text-[8px] bg-blush-100/60 text-blush-400 rounded px-1.5 py-0.5 font-bold font-body">
                        <Star size={8} /> Featured
                      </span>
                    )}
                    {p.is_new_arrival && (
                      <span className="inline-flex items-center gap-0.5 text-[8px] bg-lavender-100/60 text-lavender-400 rounded px-1.5 py-0.5 font-bold font-body">
                        <Eye size={8} /> New
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 sm:p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEdit(p)} className="p-1.5 rounded-lg hover:bg-blush-100/50 transition-colors" aria-label="Edit">
                      <Pencil size={13} className="text-gray-400 hover:text-blush-400" />
                    </button>
                    <button onClick={() => onDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" aria-label="Delete">
                      <Trash2 size={13} className="text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xs font-body">No finds match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
