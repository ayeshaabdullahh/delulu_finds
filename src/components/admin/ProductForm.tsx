import { useState } from 'react';
import { X, Image, Link as LinkIcon } from 'lucide-react';
import { Product, supabase } from '../../lib/supabase';

const categories = ['Tops', 'Dresses', 'Sets', 'Knitwear', 'Bottoms', 'Outerwear', 'Accessories'];
const sources = ['Amazon', 'Etsy', 'Daraz', 'ShareASale'];
const tagOptions = ['#CoquetteCore', '#SoftGlamour', '#Y2KVibes', '#CleanGirl', '#Cottagecore', '#OldMoney'];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export interface ProductForm {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  affiliate_url: string;
  price: string;
  original_price: string;
  source: string;
  category: string;
  aesthetic_tags: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
}

export const emptyForm: ProductForm = {
  name: '', slug: '', description: '', image_url: '', affiliate_url: '',
  price: '', original_price: '', source: 'Amazon', category: 'Tops',
  aesthetic_tags: [], is_featured: false, is_new_arrival: false,
};

interface ProductFormModalProps {
  editing: string | null;
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductFormModal({ editing, form, setForm, onClose, onSaved }: ProductFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      aesthetic_tags: f.aesthetic_tags.includes(tag)
        ? f.aesthetic_tags.filter((t) => t !== tag)
        : [...f.aesthetic_tags, tag],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, original_price: form.original_price || null };
      if (editing) {
        const { error } = await supabase.from('products').update(payload).eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || 'Save failed');
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="glass-card rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {editing ? 'Edit Find' : 'Add New Find'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-blush-100/50 transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Name *</label>
            <input type="text" value={form.name} onChange={(e) => handleNameChange(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" placeholder="e.g. Rose Silk Camisole" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all resize-none" placeholder="Describe this find..." />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">
              <Image size={10} className="inline mr-1" /> Image URL *
            </label>
            <input type="url" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" placeholder="https://..." />
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-xl" />
            )}
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">
              <LinkIcon size={10} className="inline mr-1" /> Affiliate URL *
            </label>
            <input type="url" value={form.affiliate_url} onChange={(e) => setForm((f) => ({ ...f, affiliate_url: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" placeholder="https://amazon.com/dp/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Price *</label>
              <input type="text" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required placeholder="$49" className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Original Price</label>
              <input type="text" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))} placeholder="$79" className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Source</label>
              <select value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70">
                {sources.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-lavender-300 font-bold font-body block mb-2">Aesthetic Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`clay-button-outline !py-1 !px-3 !text-[10px] font-body ${
                    form.aesthetic_tags.includes(tag) ? 'bg-lavender-200/20 border-lavender-200/70 text-lavender-400' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="accent-blush-300 w-4 h-4" />
              <span className="text-xs font-body text-gray-500">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_new_arrival} onChange={(e) => setForm((f) => ({ ...f, is_new_arrival: e.target.checked }))} className="accent-blush-300 w-4 h-4" />
              <span className="text-xs font-body text-gray-500">New Arrival</span>
            </label>
          </div>
          {error && <p className="text-red-400 text-xs font-body">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="clay-button flex-1 text-xs tracking-widest uppercase">
              {saving ? 'Saving...' : editing ? 'Update Find' : 'Add Find'}
            </button>
            <button type="button" onClick={onClose} className="clay-button-outline flex-1 text-xs tracking-widest uppercase">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
