export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-white/30 text-sm font-body mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-white/60 leading-relaxed font-body text-sm">
          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              Information We Collect
            </h2>
            <p>
              We may collect basic, non-personally-identifying information automatically as
              you browse Delulu Finds, such as your browser type, device type, and pages
              visited, through standard analytics tools. If you subscribe to our newsletter,
              we collect the email address you provide.
            </p>
          </section>

          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              Cookies
            </h2>
            <p>
              Delulu Finds uses cookies to improve your browsing experience, remember your
              saved items, and understand how visitors use our site. You can disable cookies
              through your browser settings, though some features may not work as intended.
            </p>
          </section>

          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              How We Use Your Information
            </h2>
            <p>
              Any information collected is used solely to improve the site experience, send
              newsletter updates (if you've subscribed), and understand which content our
              readers enjoy most. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              Third-Party Links
            </h2>
            <p>
              Delulu Finds contains affiliate links to third-party retailers (such as Amazon,
              Temu, and others). Once you leave our site through one of these links, this
              privacy policy no longer applies. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              Your Choices
            </h2>
            <p>
              You may unsubscribe from our newsletter at any time using the link provided in
              any email we send. You may also clear cookies or disable them entirely through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-white font-semibold text-base mb-2">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, reach out via our{' '}
              <a href="/contact" className="text-mauve hover:underline">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}