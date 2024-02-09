import { useEffect, useState } from "react";
import { getArticlesById, voteArticle } from "../../api";
import ArticleHeader from "./ArticleHeader";
import { useParams } from "react-router";
import Comments from "./Comments";
import ErrorPage from "./ErrorPage";

export default function ArticlePage() {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setError(null);
    getArticlesById(article_id)
      .then(({ data: { article } }) => {
        setContent(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  function handleUpvote() {
    setIsError(false);
    setContent((cuurentContent) => {
      const voteChange = { ...cuurentContent };
      voteChange.votes += 1;
      return voteChange;
    });
    voteArticle(article_id, 1).catch((err) => {
      setIsError(true);
    });
  }
  function handleDownvote() {
    setIsError(false);
    setContent((cuurentContent) => {
      const voteChange = { ...cuurentContent };
      voteChange.votes -= 1;
      return voteChange;
    });
    voteArticle(article_id, -1).catch((err) => {
      setIsError(true);
    });
  }

  if (error) {
    return (
      <>
        <ErrorPage message={error} />
      </>
    );
  }

  return isLoading ? (
    <h6>Article is loading</h6>
  ) : (
    <>
      <ArticleHeader title={content.title} author={content.author} />

      <div className="card" id="articlePageCard" style={{ margin: "auto" }}>
        <img
          src={content.article_img_url}
          className="card-img-top"
          alt={`picture for the article about ${content.topic}`}
          style={{
            borderWidth: "10px",
            borderStyle: "groove",
            borderColor: "lightblue",
          }}
        />
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
        {isError ? (
          <p style={{ textAlign: "center" }}>
            your vote could not be registered at this moment
          </p>
        ) : null}
      </div>
      <Comments article_id={article_id} />
    </>
  );
}
