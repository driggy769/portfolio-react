import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../lib/sanity";
import "./Blog.css";

const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featuredImage
}`;

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let alive = true;

    client
      .fetch(POSTS_QUERY)
      .then((data) => {
        if (alive) setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        if (alive) setPosts([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="section blog-section" id="blog">
      <div className="section-inner blog-inner">
        <h2 className="blog-heading reveal">Blog</h2>

        <p className="blog-intro">
          Thoughts on design, development, and the process of building things
          for the web.
        </p>

        <div className="blog-grid">
          {posts.map((post) => {
            const imgUrl = post.featuredImage
              ? urlFor(post.featuredImage)
                  .width(900)
                  .height(600)
                  .fit("crop")
                  .url()
              : null;

            return (
              <Link
                key={post._id}
                className="blog-link"
                to={`/blog/${post.slug}`}
              >
                <article className="blog-card">
                  <div className="blog-thumb">
                    {imgUrl ? (
                      <img src={imgUrl} alt={post.title} loading="lazy" />
                    ) : (
                      <div className="blog-thumb-fallback" />
                    )}
                  </div>

                  <div className="blog-content">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-cta">Read post</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blog;
