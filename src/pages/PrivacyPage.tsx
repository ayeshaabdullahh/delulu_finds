export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">
            Your Data
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
        </div>

        <div className="space-y-5 font-body text-muted leading-relaxed">
          <h2 className="font-display text-lg font-semibold text-charcoal">What we collect</h2>
          <p>
            When you save a find, we store an anonymous session identifier in your browser's
            local storage so we can remember your saved items between visits. This identifier
            is not linked to your identity.
          </p>
          <p>
            If you subscribe to our newsletter, we store your email address for the sole purpose
            of sending you curated fashion finds and sale alerts.
          </p>

          <h2 className="font-display text-lg font-semibold text-charcoal">What we don't collect</h2>
          <p>
            We do not collect your name, browsing history, or payment information. We do not sell
            or share your personal data with third parties.
          </p>

          <h2 className="font-display text-lg font-semibold text-charcoal">Affiliate links</h2>
          <p>
            When you click an affiliate link to an external retailer, that retailer's own privacy
            policy will apply to your interaction with their site. We encourage you to review
            their policies.
          </p>

          <h2 className="font-display text-lg font-semibold text-charcoal">Contact</h2>
          <p>
            For privacy-related questions, please reach out through our contact page.
          </p>
          <p className="text-xs text-gray-400">
            Last updated: September 2026
          </p>
        </div>
      </div>
    </div>
  );
}
