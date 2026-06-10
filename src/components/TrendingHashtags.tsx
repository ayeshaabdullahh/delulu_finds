import { Link } from 'react-router-dom';

const trendingTags = [
  '#CoquetteCore',
  '#SoftGlamour',
  '#Y2KVibes',
  '#CleanGirl',
  '#Cottagecore',
  '#OldMoney',
  '#ModestChic',
  '#Balletcore',
  '#Barbiecore',
  '#HijabFashion',
  '#DarkAcademia',
  '#WhimsyStyle',
  '#FairyKei',
  '#VintageVibes',
  '#StreetStyle',
];

export default function TrendingHashtags() {
  return (
    <section className="bg-dark py-6 overflow-hidden border-y border-mauve/20">
      <div className="relative">
        {/* Marquee container - doubled for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trendingTags, ...trendingTags].map((tag, i) => (
            <Link
              key={`${tag}-${i}`}
              to={`/search?q=${encodeURIComponent(tag.replace('#', ''))}`}
              className="inline-block mx-3 px-5 py-2 rounded-full border border-mauve/40 bg-charcoal text-mauve text-sm font-semibold hover:bg-mauve/10 hover:border-mauve transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
