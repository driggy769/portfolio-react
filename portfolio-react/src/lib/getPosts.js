import { sanityClient } from "./sanity";

export async function getPosts() {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "image": mainImage.asset->url
    }
  `;

  return await sanityClient.fetch(query);
}
