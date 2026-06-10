import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';

function FloatingBow({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`absolute floating-object ${className || ''}`} style={{ animationDelay: `${delay}s` }}>
      <svg width="40" height="25" viewBox="0 0 80 50" fill="none">
        <path d="M40 25 C20 5, 0 10, 10 25 C0 40, 20 45, 40 25" fill="#B5657B" opacity="0.35" />
        <path d="M40 25 C60 5, 80 10, 70 25 C80 40, 60 45, 40 25" fill="#B5657B" opacity="0.25" />
        <ellipse cx="40" cy="25" rx="5" ry="4" fill="#B5657B" opacity="0.3" />
      </svg>
    </div>
  );
}

function FloatingSparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`absolute floating-object ${className || ''}`} style={{ animationDelay: `${delay}s` }}>
      <Sparkles size={24} className="text-mauve" style={{ opacity: 0.35 }} />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: '#FDF6F0' }}
    >
      {/* Giant watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <span
          className="font-display font-bold tracking-wider whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(8rem, 20vw, 22rem)',
            color: '#1A1A1A',
            opacity: 0.06,
            letterSpacing: '0.02em',
          }}
        >
          DELULU FINDS
        </span>
      </div>

      {/* Large decorative pill/oval shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mauve pill */}
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '350px',
            background: '#B5657B',
            opacity: 0.12,
            top: '15%',
            right: '5%',
            transform: 'rotate(-15deg)',
            filter: 'blur(60px)',
          }}
        />
        {/* Dark pill */}
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '280px',
            background: '#1A1A1A',
            opacity: 0.06,
            bottom: '20%',
            left: '10%',
            transform: 'rotate(10deg)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingBow className="top-[18%] left-[12%]" delay={0} />
        <FloatingSparkle className="top-[25%] left-[20%]" delay={0.5} />
        <FloatingBow className="top-[10%] right-[30%]" delay={1} />
        <FloatingSparkle className="top-[15%] right-[15%]" delay={1.5} />
        <FloatingBow className="bottom-[25%] left-[8%]" delay={2} />
        <FloatingSparkle className="bottom-[30%] right-[25%]" delay={2.5} />
        <FloatingSparkle className="top-[35%] left-[5%]" delay={0.8} />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left column - Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow text */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-mauve">
                ✦ CURATED DAILY
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up">
              <span className="block text-charcoal">Find Your</span>
              <span className="block">
                <span className="text-mauve italic">Aesthetic.</span>
              </span>
              <span className="block text-charcoal">Shop Your Vibe.</span>
            </h1>

            {/* Subtext */}
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up font-body leading-relaxed" style={{ animationDelay: '0.2s' }}>
              We scour the internet so you don't have to. Handpicked fashion finds from the best brands, curated with love.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/explore">
                <button className="bg-mauve hover:bg-mauve-light text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-mauve/20 flex items-center gap-2">
                  Explore Finds
                  <span>→</span>
                </button>
              </Link>
              <Link to="/explore?filter=new">
                <button className="bg-transparent border-2 border-charcoal text-charcoal hover:bg-charcoal/5 font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105">
                  Today's Picks
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2">
                <span className="text-charcoal font-bold text-lg">200+</span>
                <span className="text-muted text-sm">Curated Finds</span>
              </div>
              <div className="w-px h-6 bg-charcoal/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-charcoal font-bold text-lg">50K+</span>
                <span className="text-muted text-sm">Happy Shoppers</span>
              </div>
              <div className="w-px h-6 bg-charcoal/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-charcoal font-bold text-lg">4.9★</span>
                <span className="text-muted text-sm">Avg Rating</span>
              </div>
            </div>
          </div>

          {/* Right column - Girl image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg animate-fade-in">
              {/* Girl image with editorial style */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion editorial - confident woman in dark elegant outfit"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'contrast(1.05) saturate(1.1)',
                  }}
                />
                {/* Gradient overlay for editorial feel */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(253, 246, 240, 0.3) 0%, transparent 30%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in z-10" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-bold font-body">Scroll</span>
        <ArrowDown size={16} className="text-mauve animate-bounce" />
      </div>
    </section>
  );
}
