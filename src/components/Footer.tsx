import { Link } from 'react-router-dom';
import { Instagram, Heart, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  Browse: [
    { label: 'Trending Finds', to: '/explore' },
  ],
  Categories: [
    { label: 'Clothes', to: '/explore?category=Clothing' },
    { label: 'Shoes', to: '/explore?category=Shoes' },
    { label: 'Bags', to: '/explore?category=Bags' },
    { label: 'Beauty', to: '/explore?category=Beauty' },
    { label: 'Scarves', to: '/explore?category=Scarves' },
  ],
  About: [
    { label: 'Our Story', to: '/about' },
    { label: 'Affiliate Disclosure', to: '/disclosure' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Contact', to: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-24 sm:pb-8 bg-dark">
      {/* Top border glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-mauve/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold tracking-wide text-white">
                DELULU FINDS
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 font-body">
              Your daily dose of curated fashion finds from across the internet.
            </p>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
             
                            <a href="https://www.pinterest.com/TheDeluluDrip" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-mauve"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="https://www.instagram.com/delulu_era_loading/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="Instagram">
                <Instagram size={16} className="text-mauve" />
              </a>
              <a href="https://www.youtube.com/@TheDeluluDrip" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="YouTube">
                <Youtube size={16} className="text-mauve" />
              </a>
              <a href="https://www.tiktok.com/@user1984504368737" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-mauve"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.59-1.16-2.59-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61594227117660" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="Facebook">
                <Facebook size={16} className="text-mauve" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbCt6xGAO7RMHUhjxX2c" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-mauve/20 flex items-center justify-center transition-colors border border-mauve/20" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-mauve"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.017 2C6.478 2 2 6.478 2 12.017c0 1.973.573 3.877 1.65 5.529L2 22l4.552-1.612a9.94 9.94 0 0 0 5.465 1.612c5.539 0 10.017-4.478 10.017-10.017C22.034 6.478 17.556 2 12.017 2zm0 18.11a8.06 8.06 0 0 1-4.31-1.24l-.31-.19-2.68.95.955-2.615-.203-.322A8.087 8.087 0 0 1 3.928 12.02c0-4.464 3.633-8.098 8.098-8.098s8.098 3.634 8.098 8.098-3.634 8.09-8.107 8.09z"/></svg>
              </a>
        
              
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/50 text-sm hover:text-mauve transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-mauve/10">
          <p className="text-white/50 text-[11px] leading-relaxed text-center font-body">
            <span className="font-bold text-white/70">Affiliate Disclosure:</span> This site contains affiliate links. We may earn a small commission if you make a purchase through our links -- at no extra cost to you. We only recommend products we genuinely love. Your support helps us keep curating!
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-mauve/20 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-xs font-body">
            &copy; {new Date().getFullYear()} Delulu Finds | TheDeluluDrip
          </p>
          <p className="text-white/55 text-xs flex items-center gap-1 font-body">
            Curated with <Heart size={10} className="text-mauve" fill="currentColor" /> for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
