import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

export const sanityClient = createClient({
  projectId: '84umijys',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  withCredentials: false,
});

const builder = imageUrlBuilder(sanityClient);

export type SanityImage = {
  asset: { _ref: string; _type?: string };
  [key: string]: unknown;
};

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: SanityImage | null;
  category: string;
  excerpt: string;
  content: PortableTextBlock[];
  relatedProductSlugs: string[];
  publishedAt: string;
};

// Safely extract a slug string regardless of whether the shape is
// { current: "x" } or the raw "x". Normalizes to the object form.
export function getPostSlug(post: Pick<BlogPost, 'slug'>): string {
  const s = post.slug as unknown;
  if (typeof s === 'string') return s;
  if (s && typeof s === 'object' && typeof (s as { current?: unknown }).current === 'string') {
    return (s as { current: string }).current;
  }
  return '';
}

function normalizeSlug(p: { slug: unknown } & Record<string, unknown>): BlogPost {
  if (typeof p.slug === 'string') {
    return { ...p, slug: { current: p.slug } } as unknown as BlogPost;
  }
  return p as unknown as BlogPost;
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  coverImage,
  category,
  excerpt,
  content,
  relatedProductSlugs,
  publishedAt
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
      ${postFields}
    }`
  );
  return posts.map((p: { slug: unknown } & Record<string, unknown>) => normalizeSlug(p));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${postFields}
    }`,
    { slug }
  );
  if (!post) return null;
  return normalizeSlug(post as { slug: unknown } & Record<string, unknown>);
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) [0...${limit}] {
      ${postFields}
    }`
  );
  return posts.map((p: { slug: unknown } & Record<string, unknown>) => normalizeSlug(p));
}

export async function getPostByProductSlug(productSlug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt) && $productSlug in relatedProductSlugs][0] {
      ${postFields}
    }`,
    { productSlug }
  );
  if (!post) return null;
  return normalizeSlug(post as { slug: unknown } & Record<string, unknown>);
}