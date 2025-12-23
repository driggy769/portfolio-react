import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../lib/sanity";
import "./BlogPostPage.css";

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  publishedAt,
  featuredImage,
  body
}`;

const RELATED_QUERY = `*[
  _type == "blogPost" &&
  slug.current != $slug
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage
}`;

const portableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith("http");

      return (
        <a
          href={value.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    client.fetch(POST_QUERY, { slug }).then(setPost).catch(console.error);
    client.fetch(RELATED_QUERY, { slug }).then(setRelated).catch(console.error);
  }, [slug]);

  if (!post) {
    return (
      <div className="blogpost-page">
        <main className="blogpost-content">
          <section className="blogpost-text">
            <h2>Post not found</h2>
            <p>The post you’re looking for doesn’t exist.</p>
          </section>
        </main>
      </div>
    );
  }

  const heroImg = post.featuredImage
    ? urlFor(post.featuredImage).width(2000).url()
    : null;

  return (
    <div className="blogpost-page">
      {/* HERO */}
      {heroImg && (
        <header className="blogpost-hero">
          <img src={heroImg} alt={post.title} />

          <div className="blogpost-hero-overlay">
            <div className="blogpost-hero-inner">
              <h1>{post.title}</h1>
            </div>
          </div>
        </header>
      )}

      {/* CONTENT */}
      <main className="blogpost-content">
        <section className="blogpost-text">
          <PortableText value={post.body} components={portableTextComponents} />
        </section>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <section className="blogpost-related">
            <h2>Related posts</h2>

            <div className="blogpost-related-grid">
              {related.map((item) => {
                const img = item.featuredImage
                  ? urlFor(item.featuredImage)
                      .width(600)
                      .height(400)
                      .fit("crop")
                      .url()
                  : null;

                return (
                  <Link
                    key={item._id}
                    to={`/blog/${item.slug}`}
                    className="blogpost-related-card"
                  >
                    {img && (
                      <div className="blogpost-related-thumb">
                        <img src={img} alt={item.title} />
                      </div>
                    )}

                    <div className="blogpost-related-content">
                      <h3>{item.title}</h3>
                      <span>Read post</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default BlogPostPage;
