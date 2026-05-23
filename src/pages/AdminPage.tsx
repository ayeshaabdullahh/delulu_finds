import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Plus, LayoutDashboard, Package, BarChart3, Settings } from 'lucide-react';
import { Product, getProducts, supabase } from '../lib/supabase';
import DashboardStats from '../components/admin/DashboardStats';
import CategoryBreakdown from '../components/admin/CategoryBreakdown';
import SourceBreakdown from '../components/admin/SourceBreakdown';
import RecentProducts from '../components/admin/RecentProducts';
import QuickActions from '../components/admin/QuickActions';
import ProductTable from '../components/admin/ProductTable';
import ProductFormModal, { ProductForm, emptyForm } from '../components/admin/ProductForm';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

type Tab = 'overview' | 'products' | 'add';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const loadData = async () => {
    try {
      const data = await getProducts({});
      setProducts(data);
      const { count } = await supabase.from('saved_items').select('*', { count: 'exact', head: true });
      setTotalSaved(count || 0);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (authed) loadData();
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setLoginError('');
    } else {
      setLoginError('Wrong password');
    }
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, slug: p.slug, description: p.description, image_url: p.image_url,
      affiliate_url: p.affiliate_url, price: p.price, original_price: p.original_price || '',
      source: p.source, category: p.category, aesthetic_tags: p.aesthetic_tags || [],
      is_featured: p.is_featured, is_new_arrival: p.is_new_arrival,
    });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    loadData();
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setEditing(null);
    loadData();
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const sources = [...new Set(products.map((p) => p.source))];
  const featuredCount = products.filter((p) => p.is_featured).length;
  const newArrivalCount = products.filter((p) => p.is_new_arrival).length;

  // Login screen
  if (!authed) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center" style={{ background: '#FFF8F5' }}>
        <div className="glass-card rounded-3xl p-8 w-full max-w-sm mx-4">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blush-100/60 flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={24} className="text-blush-300" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-charcoal">Admin Dashboard</h1>
            <p className="text-gray-400 text-xs font-body mt-1">Delulu Finds Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-5 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blush-100/50 text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all font-body"
            />
            {loginError && <p className="text-red-400 text-xs text-center font-body">{loginError}</p>}
            <button type="submit" className="clay-button w-full text-xs tracking-widest uppercase">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'products', label: 'All Finds', icon: Package },
    { key: 'add', label: 'Add New', icon: Plus },
  ];

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal flex items-center gap-3">
              <LayoutDashboard size={28} className="text-blush-300" />
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm font-body mt-1">Manage your curated finds and track performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="clay-button-outline !py-2 !px-4 !text-xs flex items-center gap-2 font-body">
              View Site
            </Link>
            <button onClick={() => setAuthed(false)} className="clay-button-outline !py-2 !px-4 !text-xs flex items-center gap-2 font-body">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (tab.key === 'add') openNew();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase font-body transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'clay-button !text-[11px]'
                  : 'glass-card hover:bg-white/60 text-gray-500'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <DashboardStats
              totalProducts={products.length}
              totalCategories={categories.length}
              totalSources={sources.length}
              totalSaved={totalSaved}
              featuredCount={featuredCount}
              newArrivalCount={newArrivalCount}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CategoryBreakdown products={products} />
                <SourceBreakdown products={products} />
              </div>
              <div className="space-y-6">
                <QuickActions onAddProduct={() => { setActiveTab('add'); openNew(); }} />
                <RecentProducts products={products} />
              </div>
            </div>
          </div>
        )}

        {/* Products tab */}
        {activeTab === 'products' && (
          <ProductTable
            products={products}
            onEdit={(p) => { openEdit(p); setShowForm(true); }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Product form modal */}
      {showForm && (
        <ProductFormModal
          editing={editing}
          form={form}
          setForm={setForm}
          onClose={() => { setShowForm(false); setEditing(null); setActiveTab(editing ? 'products' : 'overview'); }}
          onSaved={handleFormSaved}
        />
      )}
    </div>
  );
}
