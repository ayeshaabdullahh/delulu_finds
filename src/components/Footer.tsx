import { Link } from 'react-router-dom';
import { Instagram, Heart } from 'lucide-react';

const footerLinks = {
  Browse: [
    { label: 'Trending Finds', to: '/explore' },
    { label: 'New Arrivals', to: '/explore?filter=new' },
    { label: 'Under $50', to: '/explore?filter=under50' },
    { label: 'Sale Alerts', to: '/explore?filter=sale' },
    { label: 'All Categories', to: '/explore' },
  ],
  Categories: [
    { label: 'Dresses', to: '/explore?category=Dresses' },
    { label: 'Tops', to: '/explore?category=Tops' },
    { label: 'Sets', to: '/explore?category=Sets' },
    { label: 'Knitwear', to: '/explore?category=Knitwear' },
    { label: 'Accessories', to: '/explore?category=Accessories' },
  ],
  About: [
    { label: 'How It Works', to: '/#lookbook' },
    { label: 'Our Story', to: '/about' },
    { label: 'Affiliate Disclosure', to: '/disclosure' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Contact', to: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-24 sm:pb-8" style={{ background: 'linear-gradient(180deg, #FFF8F5 0%, #FFF0F4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-blush-200/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl font-semibold text-gradient mb-4 block">
              DELULU FINDS
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-body">
              Your daily dose of curated fashion finds from across the internet.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.pinterest.com/TheDeluluDrip" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-blush-100/50 transition-colors" aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blush-300"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-lavender-100/50 transition-colors" aria-label="Instagram">
                <Instagram size={16} className="text-lavender-300" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-medium text-charcoal mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-gray-400 text-sm hover:text-blush-300 transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="glass-card rounded-2xl p-4 mb-8">
          <p className="text-gray-400 text-[11px] leading-relaxed text-center font-body">
            <span className="font-bold text-gray-500">Affiliate Disclosure:</span> This site contains affiliate links. We may earn a small commission if you make a purchase through our links -- at no extra cost to you. We only recommend products we genuinely love. Your support helps us keep curating!
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-blush-100/40 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-xs font-body">
            &copy; 2025 Delulu Finds | TheDeluluDrip
          </p>
          <p className="text-gray-300 text-xs flex items-center gap-1 font-body">
            Curated with <Heart size={10} className="text-blush-300" fill="currentColor" /> for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
