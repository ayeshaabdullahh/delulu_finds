import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

const serializers = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img src={urlFor(value).width(1200).url()} alt={value.alt || ''} className="w-full rounded-2xl" loading="lazy" />
          {value.caption && (
            <figcaption className="text-center text-muted text-xs mt-2 font-body italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mt-10 mb-4 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mt-8 mb-3 leading-tight">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-mauve/40 pl-6 my-6 italic font-display text-lg text-charcoal/80">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="text-charcoal/80 text-base leading-relaxed mb-5 font-body">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-mauve underline hover:text-mauve-dark transition-colors">{children}</a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-charcoal">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-5 text-charcoal/80 font-body">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-5 text-charcoal/80 font-body">{children}</ol>,
  },
};

export default function PortableTextRenderer({ content }: { content: any[] }) {
  return <PortableText value={content} components={serializers as any} />;
}
