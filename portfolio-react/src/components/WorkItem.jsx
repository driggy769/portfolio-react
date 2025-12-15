import { Link } from "react-router-dom";

function WorkItem({ project }) {
  return (
    <article className="work-item">
      <img
        src={project.thumb}
        alt={project.title}
        className={project.imageClass || ""}
      />

      <div className="work-dark"></div>

      <div className="work-overlay">
        <h4>{project.title}</h4>
        <p>{project.intro}</p>

        {/* THIS is the key */}
        <Link to={`/work/${project.slug}`} reloadDocument className="work-link">
          View project
        </Link>
      </div>
    </article>
  );
}

export default WorkItem;
