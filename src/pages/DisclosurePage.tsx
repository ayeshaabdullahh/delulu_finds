export default function DisclosurePage() {
  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">
            Transparency
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
            Affiliate <span className="text-gradient">Disclosure</span>
          </h1>
        </div>

        <div className="space-y-5 font-body text-muted leading-relaxed">
          <p>
            This site contains affiliate links. Delulu Finds may earn a small commission if you
            make a purchase through one of our links — at no extra cost to you.
          </p>
          <p>
            We only recommend products we genuinely love and have curated ourselves. Your support
            helps us keep finding and sharing the best fashion pieces every day.
          </p>
          <p>
            As an affiliate partner, we participate in various affiliate programs including Amazon
            Associates, Awin, Impact, Mavrly, and Daraz programs. As an Amazon Associate, we earn
            from qualifying purchases.
          </p>
          <p className="text-xs text-gray-400">
            Last updated: September 2026
          </p>
        </div>
      </div>
    </div>
  );
}
