import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Our Story | Delulu Finds — Gen Z Fashion Affiliate</title>
        <meta
          name="description"
          content="Meet Delulu Finds — your daily source for curated, aesthetic-obsessed fashion finds across Coquette, Y2K, Clean Girl & Old Money styles."
        />
      </Helmet>

      <main className="bg-dark min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            Our Story
          </h1>

          <div className="space-y-6 text-white/60 text-sm sm:text-base leading-relaxed font-body">
            <p>
              Delulu Finds started with a simple idea: scrolling for hours to find that
              one perfect piece shouldn't be necessary. We curate fashion finds across
              Coquette, Y2K, Clean Girl, and Old Money aesthetics so you can spend less
              time searching and more time styling.
            </p>
            <p>
              Every item on our site is handpicked — from $10 steals to splurge-worthy
              pieces — sourced from trusted platforms like Temu and Etsy. We genuinely
              love what we share, and we only feature products that fit the vibe.
            </p>
            <p>
              Behind Delulu Finds is a small, independent team passionate about Gen Z
              fashion and curation. Follow along on{' '}
              
                href="https://www.pinterest.com/TheDeluluDrip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:underline"
              >
                Pinterest @TheDeluluDrip
              </a>{' '}
              for daily inspiration.
            </p>
            <p className="flex items-center gap-1 text-white/40 text-xs pt-4">
              Curated with <Heart size={12} className="text-mauve" fill="currentColor" /> for fashion lovers.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-block mt-10 bg-mauve text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-mauve/80 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </main>
    </>
  );
}