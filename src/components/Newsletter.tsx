import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const MAILBLUSTER_FORM_ID = '2f1d30c7-c9c8-4d43-aade-f1d10c167248';

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = `https://api.mailbluster.com/v1/forms/${MAILBLUSTER_FORM_ID}.js`;
    script.dataset.form = MAILBLUSTER_FORM_ID;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <section id="newsletter" className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-mauve/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-charcoal/5 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-mauve/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-charcoal/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-mauve/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-mauve" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-3">
              Never Miss a <span className="text-mauve italic">Find</span>
            </h2>
            <p className="text-muted text-sm sm:text-base mb-8 max-w-md mx-auto font-body">
              Get the best curated finds and sale alerts delivered straight to your inbox. No spam, just the good stuff.
            </p>

            <div ref={containerRef} className="flex justify-center mb-8" />

            <p className="text-muted text-[11px] mt-4 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}