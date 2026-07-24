import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '84umijys',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  withCredentials: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  category: string;
  excerpt: string;
  content: any[];
  relatedProductSlug: string | null;
  publishedAt: string;
};

const postFields = `
  _id,
  title,
  "slug": slug.current,
  coverImage,
  category,
  excerpt,
  content,
  "relatedProductSlug": relatedProductSlug.current,
  publishedAt
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
      ${postFields}
    }`
  );
  return posts.map((p: any) => ({ ...p, slug: { current: p.slug } }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${postFields}
    }`,
    { slug }
  );
  if (!post) return null;
  return { ...post, slug: { current: post.slug } };
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) [0...${limit}] {
      ${postFields}
    }`
  );
  return posts.map((p: any) => ({ ...p, slug: { current: p.slug } }));
}

export async function getPostByProductSlug(productSlug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch(
    `*[_type == "blogPost" && relatedProductSlug.current == $productSlug][0] {
      ${postFields}
    }`,
    { productSlug }
  );
  if (!post) return null;
  return { ...post, slug: { current: post.slug } };
}

export { urlFor }

export { getRecentPosts }