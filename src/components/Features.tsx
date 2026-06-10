import { Eye, Tag, TrendingUp, Bell } from 'lucide-react';

const features = [
  { icon: Eye, title: 'Curated Daily', description: 'New finds handpicked every single day' },
  { icon: Tag, title: 'Best Deals', description: 'We find the sales so you save more' },
  { icon: TrendingUp, title: 'Trending First', description: 'Spot trends before they blow up' },
  { icon: Bell, title: 'Get Notified', description: 'Alerts when your faves go on sale' },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-mauve/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon size={20} className="text-mauve" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-medium text-charcoal mb-1">{feature.title}</h3>
              <p className="text-muted text-xs sm:text-sm font-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
