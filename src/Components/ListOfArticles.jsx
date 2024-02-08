import { Link } from "react-router-dom";
import getArticles from "../../api";
import ArticleCard from "./ArticleCard";
import HomeHeader from "./HomeHeader";
import { useEffect, useState } from "react";

export default function ListOfArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticles().then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <HomeHeader />
      {isLoading ? <h6>Loading the articles</h6> : null}
      <div
        className="btn-group"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "10px",
          margin: "auto",
          textDecoration: "none",
          padding: "2%",
        }}
      >
        <button
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Topics
        </button>
        <ul className="dropdown-menu">
          <Link to="/topics/cooking">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Cooking
              </p>
            </li>
          </Link>
          <Link to="/topics/football">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Football
              </p>
            </li>
          </Link>
          <Link to="/topics/coding">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Coding
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <section>
        <div className="container text-center">
          <div className="row" style={{ paddingBottom: "2%" }}>
            {articles.map((article) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
                  style={{ justifyContent: "center" }}
                  key={article.article_id}
                >
                  <ArticleCard article={article} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
