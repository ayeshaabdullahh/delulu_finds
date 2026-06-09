import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, ChevronDown } from 'lucide-react';

const categories = ['Clothing', 'Shoes', 'Bags', 'Jewelry', 'Accessories', 'Beauty', 'Nails', 'Swimwear', 'Abayas', 'Scarves'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (cat: string) => {
    setCategoriesOpen(false);
    navigate(`/explore?category=${encodeURIComponent(cat)}`);
  };

  const links = [
    { label: 'Trending', to: '/explore' },
    { label: 'New Finds', to: '/explore?filter=new' },
    { label: 'Under $10', to: '/explore?filter=under10' },
    { label: 'Lookbook', to: '/#lookbook' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-blush-100/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} className="text-blush-400" /> : <Menu size={22} className="text-blush-400" />}
            </button>

            {/* Logo - Bigger and more prominent */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gradient drop-shadow-sm">
                DELULU FINDS
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Categories dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="text-sm font-semibold text-gray-600 hover:text-blush-400 transition-colors relative group flex items-center gap-1"
                >
                  Categories
                  <ChevronDown size={14} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-200 transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 glass-card rounded-2xl py-3 shadow-xl animate-slide-up z-50">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-blush-400 hover:bg-blush-50/50 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-semibold text-gray-600 hover:text-blush-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-200 transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right icons - Search bar always visible */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search bar - always visible on desktop */}
              <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search finds..."
                    className="pl-9 pr-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-blush-100/50 text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all font-body w-48 lg:w-64"
                  />
                </div>
              </form>

              {/* Mobile search toggle */}
              <button
                className="sm:hidden p-2 rounded-full hover:bg-blush-100/50 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} className="text-gray-500 hover:text-blush-400 transition-colors" />
              </button>

              <Link to="/saved" className="p-2 rounded-full hover:bg-blush-100/50 transition-colors relative" aria-label="Saved finds">
                <Heart size={20} className="text-gray-500 hover:text-blush-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search bar dropdown */}
        {searchOpen && (
          <div className="glass-nav px-4 pb-4 animate-slide-up sm:hidden">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search finds..."
                  className="w-full pl-9 pr-4 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blush-100/50 text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all font-body"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-nav px-4 pb-6 pt-2">
            {/* Mobile categories */}
            <div className="mb-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body mb-2 px-2">Categories</p>
              <div className="flex flex-wrap gap-2 px-2 mb-3">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/explore?category=${encodeURIComponent(cat)}`}
                    className="text-xs font-semibold text-gray-600 hover:text-blush-400 transition-colors bg-white/50 px-3 py-1.5 rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block py-3 text-sm font-semibold text-gray-600 hover:text-blush-400 transition-colors border-b border-blush-100/30 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="bottom-nav lg:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 text-blush-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[10px] font-bold tracking-wide">Home</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blush-300 transition-colors">
            <Search size={20} />
            <span className="text-[10px] font-bold tracking-wide">Explore</span>
          </Link>
          <Link to="/saved" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blush-300 transition-colors">
            <Heart size={20} />
            <span className="text-[10px] font-bold tracking-wide">Saved</span>
          </Link>
          <a
            href="https://www.pinterest.com/TheDeluluDrip"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blush-300 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            <span className="text-[10px] font-bold tracking-wide">Pinterest</span>
          </a>
        </div>
      </div>
    </>
  );
}
