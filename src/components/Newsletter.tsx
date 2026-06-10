import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

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

            {submitted ? (
              <div className="bg-mauve/10 rounded-2xl p-6 inline-block border border-mauve/20">
                <p className="text-mauve font-semibold text-sm font-body">You're in! Check your inbox for today's top finds.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-full bg-white/80 border border-charcoal/10 text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-mauve/50 focus:ring-2 focus:ring-mauve/20 transition-all"
                  required
                />
                <button type="submit" className="clay-button !px-6 flex items-center justify-center gap-2">
                  <Send size={14} />
                  <span className="text-xs tracking-wider uppercase">Subscribe</span>
                </button>
              </form>
            )}

            <p className="text-muted/60 text-[10px] mt-4 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
