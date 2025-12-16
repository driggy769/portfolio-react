import { Link } from "react-router-dom";
import "./BlogCard.css";

function BlogCard({ post }) {
  // ✅ Support either key so it never breaks again
  const imageSrc = post.featureImage || post.image || "";

  return (
    <article className="blog-card reveal">
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <img src={post.featureImage} alt={post.title} />
        </div>

        <div className="blog-card-content">
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard;
