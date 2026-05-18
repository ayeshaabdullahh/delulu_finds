import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCw, ExternalLink } from 'lucide-react';
import { Product, getProducts } from '../lib/supabase';

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const animRef = useRef<number>(0);
  const lastTime = useRef(0);

  useEffect(() => {
    getProducts({ featured: true, limit: 8 }).then(setProducts).catch(() => {});
  }, []);

  const ITEM_COUNT = products.length || 1;
  const ANGLE_STEP = 360 / ITEM_COUNT;
  const RADIUS = 380;

  const autoRotate = useCallback((time: number) => {
    if (lastTime.current === 0) lastTime.current = time;
    const delta = time - lastTime.current;
    lastTime.current = time;
    if (!isHovered && !isDragging) {
      setRotation((prev) => prev + delta * 0.012);
    }
    animRef.current = requestAnimationFrame(autoRotate);
  }, [isHovered, isDragging]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(animRef.current);
  }, [autoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current + deltaX * 0.3);
  };

  const handlePointerUp = () => setIsDragging(false);

  const goTo = (dir: 'prev' | 'next') => {
    setRotation((prev) => prev + (dir === 'next' ? -ANGLE_STEP : ANGLE_STEP));
  };

  const sourceClass = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('amazon')) return 'source-amazon';
    if (s.includes('etsy')) return 'source-etsy';
    if (s.includes('daraz')) return 'source-daraz';
    if (s.includes('shareasale')) return 'source-shareasale';
    return 'source-amazon';
  };

  if (products.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="trending">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blush-200/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-lavender-200/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-blush-300 font-bold mb-3 font-body">
            Top Finds This Week
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Spin the <span className="text-gradient">Finds</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto font-body">
            Drag to explore our curated picks in 360 degrees
          </p>
        </div>

        <div className="relative flex items-center justify-center" style={{ height: '480px' }}>
          {/* Pink glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full animate-glow-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(242,167,187,0.3) 0%, rgba(201,184,232,0.15) 40%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Carousel */}
          <div
            className="carousel-container relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
          >
            <div
              className="relative w-[220px] h-[300px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
              {products.map((product, i) => {
                const angle = i * ANGLE_STEP;
                return (
                  <div
                    key={product.id}
                    className="absolute inset-0 carousel-item"
                    style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)` }}
                  >
                    <div className="glass-card rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                      <div className="relative h-[58%] overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <span className={`absolute top-3 left-3 source-badge ${sourceClass(product.source)}`}>
                          {product.source}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col justify-between h-[42%]">
                        <div>
                          <Link to={`/product/${product.slug}`} className="font-display text-sm font-medium text-charcoal hover:text-blush-400 transition-colors line-clamp-1">
                            {product.name}
                          </Link>
                          {product.aesthetic_tags?.[0] && (
                            <span className="text-[10px] tracking-wider uppercase text-lavender-300 font-bold font-body">
                              {product.aesthetic_tags[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blush-400 font-bold text-sm font-body">{product.price}</span>
                          <a
                            href={product.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="clay-button !py-1.5 !px-4 !text-[10px] flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={10} />
                            Shop
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <button onClick={() => goTo('prev')} className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/60 transition-all" aria-label="Previous">
            <ChevronLeft size={18} className="text-blush-400" />
          </button>
          <button onClick={() => goTo('next')} className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/60 transition-all" aria-label="Next">
            <ChevronRight size={18} className="text-blush-400" />
          </button>

          {/* Rotation indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blush-300">
            <RotateCw size={14} />
            <span className="text-[10px] tracking-widest uppercase font-bold font-body">
              {isHovered ? 'Paused' : 'Auto-rotating'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
