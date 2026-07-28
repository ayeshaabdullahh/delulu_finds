import { useState, useRef, useLayoutEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  text: string;
  className?: string;
  collapsedLines?: number;
};

const CLAMP_CLASSES: Record<number, string> = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
};

export default function ExpandableDescription({
  text,
  className = '',
  collapsedLines = 3,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const clamp = CLAMP_CLASSES[collapsedLines] || 'line-clamp-3';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(clamp);
    const fullHeight = el.scrollHeight;
    el.classList.add(clamp);
    const clampedHeight = el.clientHeight;
    setClamped(fullHeight > clampedHeight + 1);
  }, [text, clamp]);

  return (
    <div>
      <p
        ref={ref}
        className={`font-body leading-relaxed ${className} ${expanded ? '' : clamp}`}
      >
        {text}
      </p>
      {clamped && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 text-mauve font-bold text-xs tracking-widest uppercase font-body hover:gap-2 transition-all mt-2"
        >
          {expanded ? 'Show less' : 'Read more'}
          <ChevronDown
            size={12}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}
