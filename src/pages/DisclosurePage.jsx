export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Affiliate Disclosure
        </h1>
        <p className="text-white/30 text-sm font-body mb-10">Last updated: August 2026</p>

        <div className="space-y-6 text-white/60 leading-relaxed font-body text-sm">
          <p>
            Delulu Finds is a participant in various affiliate marketing programs, including
            but not limited to the Amazon Associates Program, Temu's affiliate program, and
            other retailer affiliate networks. These are advertising programs designed to
            provide a means for sites to earn commission fees by linking to partner
            retailers.
          </p>

          <p>
            <span className="text-white font-semibold">What this means for you: </span>
            when you click on a product link on Delulu Finds and make a purchase, we may earn
            a small commission — at no extra cost to you. The price you pay stays exactly the
            same whether you use our link or go directly to the retailer.
          </p>

          <p>
            <span className="text-white font-semibold">Our promise: </span>
            we only feature products we genuinely love and think you'll love too. Commission
            earnings never influence which products we choose to curate — our aesthetic and
            quality standards come first.
          </p>

          <p>
            As an Amazon Associate, Delulu Finds earns from qualifying purchases. We are also
            compensated for referring traffic and business to other companies through
            affiliate links on this site.
          </p>

          <p>
            If you have any questions about our affiliate relationships or this disclosure,
            feel free to reach out via our{' '}
            <a href="/contact" className="text-mauve hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}