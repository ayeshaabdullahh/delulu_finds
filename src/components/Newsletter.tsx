import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { KIT_FORM_CK_JS, KIT_FORM_HTML } from '../lib/kitForm';

// Number of Newsletter instances currently mounted. We only remove the shared
// Kit form script from <body> when the LAST instance unmounts, so removing it
// can never break a second copy of the component still on the page.
let formkitScriptCount = 0;

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.querySelector('script[data-formkit]');
    if (!existing) {
      const s = document.createElement('script');
      s.setAttribute('data-formkit', 'true');
      s.src = KIT_FORM_CK_JS;
      s.async = true;
      document.body.appendChild(s);
    }
    formkitScriptCount += 1;
    return () => {
      formkitScriptCount -= 1;
      if (formkitScriptCount <= 0) {
        const script = document.querySelector('script[data-formkit]');
        if (script) script.remove();
      }
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

            {/* ⚠️ SECURITY: KIT_FORM_HTML is a hardcoded, trusted Kit embed string
                from src/lib/kitForm.ts, NEVER derived from user input. If it ever
                needs to be dynamic, sanitize the HTML first (e.g. DOMPurify) —
                do not pass unsanitized or user-supplied content here. */}
            <div
              ref={containerRef}
              className="w-full max-w-md mx-auto text-left overflow-hidden rounded-[12px]"
              dangerouslySetInnerHTML={{ __html: KIT_FORM_HTML }}
            />

            <p className="text-muted text-[11px] mt-4 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}