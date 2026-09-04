import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { urlFor, SanityImage } from '../lib/sanity';

type ImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  _type?: string;
};

type LinkValue = {
  href?: string;
};

const serializers: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img src={urlFor(value as unknown as SanityImage).width(1200).url()} alt={value.alt || ''} className="w-full rounded-2xl" loading="lazy" />
          {value.caption && (
            <figcaption className="text-center text-muted text-xs mt-2 font-body italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="font-display text-2xl sm:text-3xl font-semibold text-black mt-10 mb-4 leading-tight">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="font-display text-xl sm:text-2xl font-semibold text-black mt-8 mb-3 leading-tight">{children}</h3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-mauve/40 pl-6 my-6 italic font-display text-lg text-black">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="text-black text-base leading-relaxed mb-5 font-body">{children}</p>,
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: LinkValue }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-mauve underline hover:text-mauve-dark transition-colors">{children}</a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-black">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside space-y-2 mb-5 text-black font-body">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside space-y-2 mb-5 text-black font-body">{children}</ol>,
  },
};

export default function PortableTextRenderer({ content }: { content: PortableTextBlock[] }) {
  return <PortableText value={content} components={serializers} />;
}
