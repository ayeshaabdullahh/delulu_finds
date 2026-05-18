import { Plus, Upload, BarChart3, Settings, Globe, Image } from 'lucide-react';

interface QuickActionsProps {
  onAddProduct: () => void;
}

export default function QuickActions({ onAddProduct }: QuickActionsProps) {
  const actions = [
    { icon: Plus, label: 'Add New Find', desc: 'Add a product manually', onClick: onAddProduct, color: 'bg-blush-100/60 text-blush-400' },
    { icon: Globe, label: 'View Site', desc: 'Open your live site', href: '/', color: 'bg-lavender-100/60 text-lavender-400' },
    { icon: BarChart3, label: 'Explore Page', desc: 'See customer view', href: '/explore', color: 'bg-peach-100/60 text-peach-400' },
    { icon: Image, label: 'Saved Finds', desc: 'View saved collection', href: '/saved', color: 'bg-blush-100/60 text-blush-400' },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold text-charcoal mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const content = (
            <>
              <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center mb-2`}>
                <action.icon size={16} />
              </div>
              <p className="text-xs font-bold text-charcoal font-body">{action.label}</p>
              <p className="text-[10px] text-gray-300 font-body">{action.desc}</p>
            </>
          );

          if (action.onClick) {
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className="text-left p-3 rounded-xl hover:bg-blush-50/50 transition-all duration-200 hover:shadow-sm"
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={action.label}
              href={action.href}
              className="text-left p-3 rounded-xl hover:bg-blush-50/50 transition-all duration-200 hover:shadow-sm block"
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
