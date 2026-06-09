import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';

function FloatingGem({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`absolute floating-object ${className || ''}`} style={{ animationDelay: `${delay}s` }}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <defs>
          <linearGradient id="gemGrad" x1="0" y1="0" x2="60" y2="60">
            <stop offset="0%" stopColor="#F2A7BB" />
            <stop offset="50%" stopColor="#C9B8E8" />
            <stop offset="100%" stopColor="#FFD6C0" />
          </linearGradient>
        </defs>
        <polygon points="30,2 55,22 48,55 12,55 5,22" fill="url(#gemGrad)" opacity="0.8" />
        <polygon points="30,2 55,22 30,30" fill="rgba(255,255,255,0.3)" />
        <polygon points="30,2 5,22 30,30" fill="rgba(255,255,255,0.15)" />
      </svg>
    </div>
  );
}

function FloatingOrb({ className, delay = 0, color = '#F2A7BB' }: { className?: string; delay?: number; color?: string }) {
  return (
    <div className={`absolute floating-object ${className || ''}`} style={{ animationDelay: `${delay}s` }}>
      <div
        className="w-16 h-16 rounded-full animate-glow-pulse"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}88, ${color}22, transparent)`,
          boxShadow: `0 0 40px ${color}44, 0 0 80px ${color}22`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

function FloatingBow({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`absolute floating-object ${className || ''}`} style={{ animationDelay: `${delay}s` }}>
      <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
        <path d="M40 25 C20 5, 0 10, 10 25 C0 40, 20 45, 40 25" fill="#F2A7BB" opacity="0.7" />
        <path d="M40 25 C60 5, 80 10, 70 25 C80 40, 60 45, 40 25" fill="#E889A8" opacity="0.7" />
        <ellipse cx="40" cy="25" rx="5" ry="4" fill="#C4557A" opacity="0.6" />
        <path d="M38 29 L36 45 L40 42 L44 45 L42 29" fill="#C4557A" opacity="0.5" />
      </svg>
    </div>
  );
}

const trendingTags = ['#CoquetteCore', '#SoftGlamour', '#Y2KVibes', '#CleanGirl', '#Cottagecore', '#OldMoney', '#ModestChic', '#Balletcore', '#Barbiecore', '#HijabFashion', '#DarkAcademia'];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #FFF0F4 0%, #FFF8F5 50%, #F3EFF9 100%)',
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blush-200/20 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-lavender-200/20 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-peach-200/10 blur-3xl" />
      </div>

      {/* 3D Floating objects */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingGem className="top-[15%] left-[10%]" delay={0} />
        <FloatingGem className="top-[20%] right-[12%]" delay={1.5} />
        <FloatingOrb className="top-[30%] left-[20%]" delay={0.5} color="#C9B8E8" />
        <FloatingOrb className="bottom-[25%] right-[15%]" delay={2} color="#FFD6C0" />
        <FloatingOrb className="top-[60%] left-[8%]" delay={1} color="#F2A7BB" />
        <FloatingBow className="top-[12%] right-[25%]" delay={0.8} />
        <FloatingBow className="bottom-[20%] left-[18%]" delay={2.2} />
        <FloatingOrb className="top-[45%] right-[8%]" delay={1.8} color="#F2A7BB" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8 animate-fade-in">
          <Sparkles size={14} className="text-blush-300" />
          <span className="text-xs font-bold tracking-widest uppercase text-blush-400 font-body">
            Curated Daily
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 animate-fade-in-up">
          <span className="block text-charcoal">Find Your</span>
          <span className="block shimmer-text">Aesthetic.</span>
          <span className="block text-charcoal">Shop Your Vibe.</span>
        </h1>

        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-10 animate-fade-in-up font-body font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
          We scour the internet so you don't have to. Handpicked fashion finds from the best brands, curated with love.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/explore">
            <button className="clay-button text-sm tracking-widest uppercase">
              Explore Finds
            </button>
          </Link>
          <Link to="/explore?filter=new">
            <button className="clay-button-outline text-sm tracking-widest uppercase">
              Today's Picks
            </button>
          </Link>
        </div>

        {/* Trending tags */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-[10px] tracking-[0.3em] uppercase text-blush-300 font-bold mb-3 font-body">Trending Now</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingTags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(tag.replace('#', ''))}`}
                className="glass-card rounded-full px-4 py-1.5 text-xs font-bold text-blush-400 hover:bg-blush-100/40 transition-all font-body"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-blush-300 font-bold font-body">Scroll</span>
        <ArrowDown size={16} className="text-blush-300 animate-bounce" />
      </div>
    </section>
  );
}
