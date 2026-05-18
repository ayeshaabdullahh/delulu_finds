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
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blush-200/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-lavender-200/15 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blush-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-lavender-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-blush-100/60 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-blush-300" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-3">
              Never Miss a <span className="text-gradient">Find</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto font-body">
              Get the best curated finds and sale alerts delivered straight to your inbox. No spam, just the good stuff.
            </p>

            {submitted ? (
              <div className="glass-card rounded-2xl p-6 inline-block">
                <p className="text-blush-400 font-semibold text-sm font-body">You're in! Check your inbox for today's top finds.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blush-100/50 text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all font-body"
                  required
                />
                <button type="submit" className="clay-button !px-6 flex items-center justify-center gap-2">
                  <Send size={14} />
                  <span className="text-xs tracking-wider uppercase">Subscribe</span>
                </button>
              </form>
            )}

            <p className="text-gray-300 text-[10px] mt-4 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
