import { Link } from 'react-router-dom';
import { Play, ExternalLink } from 'lucide-react';

export default function Lookbook() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white" id="lookbook">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mauve/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up">
                  <img src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Lookbook 1" className="w-full h-64 object-cover" loading="lazy" />
                </div>
                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <img src="https://images.pexels.com/photos/6764235/pexels-photo-6764235.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Lookbook 2" className="w-full h-48 object-cover" loading="lazy" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <img src="https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Lookbook 3" className="w-full h-48 object-cover" loading="lazy" />
                </div>
                <div className="glass-card rounded-2xl overflow-hidden relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <img src="https://images.pexels.com/photos/6764849/pexels-photo-6764849.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Lookbook video" className="w-full h-64 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <button className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg group-hover:scale-110">
                      <Play size={20} className="text-mauve ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-mauve/10 blur-xl animate-glow-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-charcoal/5 blur-xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Right: Content */}
          <div className="lg:pl-8">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-muted font-bold mb-3 font-body">
              How It Works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6 leading-tight">
              We Find. <span className="text-mauve italic">You Shop.</span>
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 font-body">
              Think of us as your fashion-obsessed bestie who spends hours scrolling
              so you don't have to. We hunt down the cutest pieces from hundreds of
              brands and stores, then link you straight to the best deals.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'We browse 500+ brands so you don\'t have to',
                'Only the best-rated, most-loved pieces make the cut',
                'Direct links to shop -- no extra cost to you',
                'Sale alerts the moment prices drop',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-mauve/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-mauve" />
                  </div>
                  <span className="text-muted text-sm font-body">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/explore">
                <button className="clay-button tracking-widest uppercase text-xs flex items-center justify-center gap-2 w-full sm:w-auto">
                  <ExternalLink size={14} />
                  Start Browsing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
