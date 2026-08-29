import { Sparkles, Heart, ShoppingBag } from 'lucide-react';

const aesthetics = [
  { name: 'Coquette', desc: 'Soft, feminine, a little flirty', color: 'from-pink-400/30 to-rose-300/10' },
  { name: 'Y2K', desc: 'Bold, nostalgic, main-character energy', color: 'from-purple-400/30 to-fuchsia-300/10' },
  { name: 'Clean Girl', desc: 'Minimal, polished, effortless', color: 'from-amber-200/30 to-stone-200/10' },
  { name: 'Old Money', desc: 'Timeless, tailored, quietly luxe', color: 'from-emerald-300/30 to-teal-200/10' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 blur-3xl">
            <div className="w-72 h-72 rounded-full bg-mauve" />
          </div>
          <div className="inline-flex items-center gap-2 text-mauve mb-4">
            <Sparkles size={18} />
            <span className="text-sm font-body tracking-widest uppercase">Our Story</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Find your aesthetic.<br />
            <span className="text-mauve">Shop your vibe.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            Delulu Finds is your daily dose of curated fashion — the pieces that make you
            stop mid-scroll and think "I need that." We dig through the internet so you don't
            have to.
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
          <div className="rounded-3xl overflow-hidden border border-mauve/20 aspect-[4/3] bg-gradient-to-br from-mauve/20 via-dark to-dark flex items-center justify-center">
            <ShoppingBag size={64} className="text-mauve/40" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Why we started this
            </h2>
            <p className="text-white/50 leading-relaxed mb-4 font-body">
              Trend-hunting shouldn't feel like a full-time job. Between endless tabs,
              sketchy sites, and pieces that never look like the photos, finding fashion that
              actually matches your aesthetic is exhausting.
            </p>
            <p className="text-white/50 leading-relaxed font-body">
              So we built Delulu Finds — a single, curated spot for the pieces we'd
              actually buy ourselves. Every item is handpicked to fit one of four aesthetics,
              so you spend less time searching and more time being that girl.
            </p>
          </div>
        </div>

        {/* Aesthetics */}
        <div>
          <h2 className="font-display text-2xl font-bold text-white text-center mb-2">
            The four vibes we curate for
          </h2>
          <p className="text-white/40 text-center mb-10 font-body">
            Every piece on the site fits one of these
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aesthetics.map((a) => (
              <div
                key={a.name}
                className={`rounded-2xl p-6 border border-mauve/10 bg-gradient-to-br ${a.color} text-center`}
              >
                <h3 className="font-display font-semibold text-white mb-1">{a.name}</h3>
                <p className="text-white/50 text-xs font-body">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-24 text-center flex flex-col items-center gap-3">
          <Heart size={20} className="text-mauve" fill="currentColor" />
          <p className="text-white/50 font-body max-w-xl">
            Thanks for being here. New finds drop daily — save your favorites and come back often.
          </p>
        </div>
      </div>
    </div>
  );
}