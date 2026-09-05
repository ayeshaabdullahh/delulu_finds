import { useState, type FormEvent } from 'react';
import { Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const MAILBLUSTER_ENDPOINT = 'https://api.mailbluster.com/v1/forms/2f1d30c7-c9c8-4d43-aade-f1d10c167248';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(MAILBLUSTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: 'yes' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setConsent(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(
          typeof data?.message === 'string'
            ? data.message
            : 'Something went wrong. Please try again.',
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
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

            {status === 'success' ? (
              <div className="max-w-md mx-auto flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-green-600 font-body text-sm font-semibold">
                  <CheckCircle2 size={18} />
                  <span>Thanks for subscribing!</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-mauve text-xs font-body underline underline-offset-2"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-5 py-3 rounded-full bg-white/80 border border-charcoal/10 text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-mauve/50 focus:ring-2 focus:ring-mauve/20 transition-all"
                  required
                />

                <label className="flex items-start gap-2 text-left font-body text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-mauve"
                    required
                  />
                  <span>I consent to receive your newsletter &amp; marketing emails.</span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="clay-button !px-6 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={14} />
                  <span className="text-xs tracking-wider uppercase">
                    {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </span>
                </button>

                {status === 'error' && (
                  <p className="flex items-center gap-1.5 text-red-400 text-xs font-body">
                    <AlertCircle size={14} />
                    {errorMsg}
                  </p>
                )}
              </form>
            )}

            <p className="text-muted text-[11px] mt-6 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}