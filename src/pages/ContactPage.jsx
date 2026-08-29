import { Mail, Send } from 'lucide-react';

const socials = [
  {
    label: 'Pinterest',
    handle: '@TheDeluluDrip',
    href: 'https://www.pinterest.com/TheDeluluDrip',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.084.345-.091.375-.293 1.199-.334 1.363-.053.225-.177.272-.407.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.488 3.146C9.04 23.843 10.48 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@delulufinds',
    href: 'https://www.instagram.com/delulufinds',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const email = 'glimyfyhub@gmail.com';

  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-14 relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 blur-3xl">
            <div className="w-64 h-64 rounded-full bg-mauve" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Let's Talk
          </h1>
          <p className="text-white/60 leading-relaxed font-body">
            Questions, collab ideas, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        {/* Email card */}
        <a
          href={`mailto:${email}`}
          className="block bg-white/5 hover:bg-mauve/10 border border-mauve/20 rounded-2xl p-6 mb-6 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-mauve/20 flex items-center justify-center shrink-0">
              <Mail size={20} className="text-mauve" />
            </div>
            <div className="flex-1">
              <p className="text-white/40 text-xs font-body uppercase tracking-wide mb-1">Email us</p>
              <p className="text-white font-display font-semibold">{email}</p>
            </div>
            <Send size={18} className="text-mauve/50 group-hover:text-mauve transition-colors" />
          </div>
        </a>

        {/* Socials */}
        <div className="grid sm:grid-cols-2 gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 hover:bg-mauve/10 border border-mauve/10 rounded-2xl p-5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-mauve/20 flex items-center justify-center text-mauve shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-white font-display text-sm font-semibold">{s.label}</p>
                <p className="text-white/40 text-xs font-body">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-12 font-body">
          We usually reply within 2-3 business days.
        </p>
      </div>
    </div>
  );
}