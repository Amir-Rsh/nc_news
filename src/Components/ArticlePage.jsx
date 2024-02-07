import { useEffect, useState } from "react";
import { downoteArticle, getArticlesById, upvoteArticle } from "../../api";
import ArticleHeader from "./ArticleHeader";
import { useParams } from "react-router";
import Comments from "./Comments";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticlesById(article_id).then(({ data: { article } }) => {
      setContent(article);
      setIsLoading(false);
    });
  }, []);
  function handleUpvote() {
    setContent((cuurentContent) => {
      const voteChange = { ...cuurentContent };
      voteChange.votes += 1;
      return voteChange;
    });
    upvoteArticle(article_id);
  }
  function handleDownvote() {
    setContent((cuurentContent) => {
      const voteChange = { ...cuurentContent };
      voteChange.votes -= 1;
      return voteChange;
    });
    downoteArticle(article_id);
  }

  return isLoading ? (
    <p></p>
  ) : (
    <>
      <ArticleHeader title={content.title} author={content.author} />

      <div className="card" style={{ width: "70%", margin: "auto" }}>
        <img src={content.article_img_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{content.body}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            this article has {content.votes} votes <br />
            <button
              type="button"
              className="btn btn-success"
              style={{ width: "6.5rem", height: "2rem" }}
              onClick={handleUpvote}
            >
              upvote
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ width: "6.5rem", height: "2rem" }}
              onClick={handleDownvote}
            >
              downvote
            </button>
          </li>
        </ul>
      </div>
      <Comments article_id={article_id} />
    </>
  );
}
