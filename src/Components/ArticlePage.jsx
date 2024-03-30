import { useContext, useEffect, useState } from "react";
import { getArticlesById, getUserByUserId, voteArticle } from "../../api";
import ArticleHeader from "./ArticleHeader";
import { useParams } from "react-router";
import Comments from "./Comments";
import ErrorPage from "./ErrorPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import UserContext from "../Contexts/UserContext";
import { Link } from "react-router-dom";

export default function ArticlePage() {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);

  const user = useAuthState(auth);

  useEffect(() => {
    if (user[0]) {
      getUserByUserId(user[0].uid, setLoggedInUser).then(() => {
        setIsLoggedIn(true);
      });
    }
  }, [user[0]]);

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
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
    >
      {" "}
      <h6
        style={{ textAlign: "center", justifySelf: "center", color: "black" }}
      >
        Loading the articles
      </h6>
      <br />
      <img
        src="https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif"
        alt=""
        style={{ margin: "auto", justifySelf: "center", width: "250px" }}
      />
    </div>
  ) : (
    <>
      <Link to="/articles">
        <button
          id="backButton"
          style={{
            color: "black",
            textAlign: "center",
            cursor: "pointer",
            marginLeft: "10px",
            marginTop: "70px",
            margin: "70px 0 5px 10px",
            borderStyle: "solid",
            backgroundColor: "salmon",
            borderColor: "transparent",
            padding: "5px",
            borderRadius: "7%",
            fontWeight: "bold",
          }}
        >
          Back to articles
        </button>
      </Link>
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
        {!isLoggedIn ? (
          <p style={{ textAlign: "center", color: "salmon" }}>
            please login to comment or vote
          </p>
        ) : (
          <>
            {" "}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                this article has {content.votes} votes <br />
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    width: "6.5rem",
                    height: "2rem",
                    marginRight: "2px",
                  }}
                  onClick={handleUpvote}
                >
                  upvote
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{
                    width: "6.5rem",
                    height: "2rem",
                    marginLeft: "2px",
                  }}
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
            ) : null}{" "}
          </>
        )}
      </div>
      {!isLoggedIn ? null : <Comments article_id={article_id} />}
    </>
  );
}
