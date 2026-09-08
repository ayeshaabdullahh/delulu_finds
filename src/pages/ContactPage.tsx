import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';

const REASONS = [
  'General Inquiry',
  'Product Suggestion',
  'Brand / Affiliate Partnership',
  'Report an Issue',
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !reason || !message) return;
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reason, message }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong.');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">
            Get in Touch
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-muted text-sm">
            Have a question, a product suggestion, or a partnership inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {submitted ? (
            <div className="lg:col-span-3 glass-card rounded-3xl p-10 sm:p-14 text-center">
              <CheckCircle size={48} className="mx-auto text-mauve mb-5" />
              <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">Message Sent!</h2>
              <p className="text-muted text-sm font-body mb-8">
                Thanks for reaching out — we'll get back to you within 24–48 hours.
              </p>
              <Link
                to="/explore"
                className="clay-button text-xs tracking-widest uppercase inline-flex items-center gap-2"
              >
                <ExternalLink size={14} />
                Explore Finds
              </Link>
            </div>
          ) : (
            <>
              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-reason" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">
                    Reason *
                  </label>
                  <select
                    id="contact-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all appearance-none"
                  >
                    {REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs font-body">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="clay-button w-full text-xs tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={14} />
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="glass-card rounded-3xl p-6 space-y-6">
                  <h3 className="font-display text-sm font-semibold text-charcoal">Direct Contact</h3>

                  <div className="space-y-4 text-sm font-body text-muted">
                    <a href="mailto:contact@delulufinds.me" className="flex items-start gap-3 group">
                      <Mail size={16} className="text-mauve mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] tracking-wider uppercase font-bold text-blush-300 mb-0.5">Partnerships &amp; Business</span>
                        <span className="group-hover:text-mauve transition-colors break-all">contact@delulufinds.me</span>
                      </div>
                    </a>

                    <a href="mailto:delulufinds78@gmail.com" className="flex items-start gap-3 group">
                      <Mail size={16} className="text-mauve mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] tracking-wider uppercase font-bold text-blush-300 mb-0.5">General Inquiries</span>
                        <span className="group-hover:text-mauve transition-colors break-all">delulufinds78@gmail.com</span>
                      </div>
                    </a>

                    <a
                      href="https://pinterest.com/TheDeluluDrip"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <MessageSquare size={16} className="text-mauve mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] tracking-wider uppercase font-bold text-blush-300 mb-0.5">Pinterest</span>
                        <span className="group-hover:text-mauve transition-colors">@TheDeluluDrip</span>
                      </div>
                    </a>
                  </div>
                </div>

                <p className="text-xs text-muted/70 font-body text-center lg:text-left">
                  We usually reply within 24–48 hours.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
