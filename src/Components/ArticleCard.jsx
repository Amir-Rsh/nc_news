import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className="card h-100" style={{ width: 18 + "rem" }}>
      <img
        src={article.article_img_url}
        className="card-img-top"
        alt="picture of article"
      />
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <h6 className="card-title">Topic: {article.topic}</h6>
        <p className="card-text">Written by: {article.author}</p>
        <p className="card-text">Comment count: {article.comment_count}</p>
      </div>

      <Link to={`/articles/${article.article_id}`}>
        <button type="select" className="btn btn-primary">
          Read
        </button>
      </Link>
    </div>
  );
}
