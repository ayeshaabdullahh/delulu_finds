import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 sm:pb-8 min-h-screen" style={{ background: '#FFF8F5' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-mauve font-bold mb-3 font-body">
            Our Story
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            About <span className="text-gradient">Delulu Finds</span>
          </h1>
        </div>

        <div className="space-y-6 font-body text-muted leading-relaxed">
          <p>
            Delulu Finds is your daily dose of curated fashion finds from across the internet.
            We hunt through thousands of products so you don't have to — handpicking the pieces
            that match today's trending aesthetics, from Coquette and Clean Girl to Old Money and
            Modest Chic.
          </p>
          <p>
            Every find on our site is chosen because we genuinely love it. We're obsessed with
            aesthetics, silhouette, quality, and value — and we only recommend products we'd
            wear ourselves.
          </p>
          <p>
            When you shop through our affiliate links, we may earn a small commission at no extra
            cost to you. This helps us keep curating and bring you even more great finds every day.
          </p>
          <p>
            Follow us on Pinterest at <a href="https://www.pinterest.com/TheDeluluDrip" target="_blank" rel="noopener noreferrer" className="text-mauve font-bold hover:underline">@TheDeluluDrip</a> for daily inspiration.
          </p>
          <Link to="/explore" className="clay-button inline-block text-xs tracking-widest uppercase mt-4">
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
