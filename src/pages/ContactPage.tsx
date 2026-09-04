import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {submitted ? (
          <div className="glass-card rounded-3xl p-8 text-center">
            <p className="text-mauve font-semibold font-body">Message sent! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
            <div>
              <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">Name *</label>
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
              <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">Email *</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] uppercase text-blush-300 font-bold font-body block mb-1.5">Message *</label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-blush-100/50 text-sm font-body focus:outline-none focus:border-blush-200/70 focus:ring-2 focus:ring-blush-200/20 transition-all resize-none"
              />
            </div>
            <button type="submit" className="clay-button w-full text-xs tracking-widest uppercase flex items-center justify-center gap-2">
              <Send size={14} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
