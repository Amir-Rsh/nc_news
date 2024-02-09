import { Link, useParams, useSearchParams } from "react-router-dom";
import getArticles from "../../api";
import ArticleCard from "./ArticleCard";
import HomeHeader from "./HomeHeader";
import { useEffect, useState } from "react";

export default function ListOfArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const setOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSort = (query) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", query);
    setSearchParams(newParams);
  };

  function handleSort(event) {
    setSort(event.target.id);
  }

  function handleOrder(event) {
    setOrder(event.target.id);
  }

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortByQuery, orderQuery).then(
      ({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      }
    );
  }, [topic, sortByQuery, orderQuery]);
  return (
    <>
      <HomeHeader />
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
          style={{ color: "black" }}
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Topics
        </button>
        <ul className="dropdown-menu">
          <Link to="/cooking">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Cooking
              </p>
            </li>
          </Link>
          <Link to="/football">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Football
              </p>
            </li>
          </Link>
          <Link to="/coding">
            <li>
              <p className="dropdown-item" style={{ margin: "0" }}>
                Coding
              </p>
            </li>
          </Link>
        </ul>
        <button
          style={{
            marginLeft: "5px",
            color: "black",
            backgroundColor: "greenyellow",
          }}
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort by
        </button>
        <ul className="dropdown-menu">
          <li>
            <p
              className="dropdown-item"
              onClick={handleSort}
              style={{ margin: "0" }}
              id="created_at"
            >
              Date
            </p>
          </li>
          <li>
            <p
              className="dropdown-item"
              onClick={handleSort}
              style={{ margin: "0" }}
              id="comment_count"
            >
              Comment count
            </p>
          </li>
          <li>
            <p
              className="dropdown-item"
              onClick={handleSort}
              style={{ margin: "0" }}
              id="votes"
            >
              votes
            </p>
          </li>
        </ul>
        <button
          style={{
            marginLeft: "5px",
            backgroundColor: "lightgreen",

            color: "black",
          }}
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Order
        </button>
        <ul className="dropdown-menu">
          <li>
            <p
              className="dropdown-item"
              id="desc"
              onClick={handleOrder}
              style={{ margin: "0" }}
            >
              Descending
            </p>
          </li>
          <li>
            <p
              className="dropdown-item"
              id="asc"
              onClick={handleOrder}
              style={{ margin: "0" }}
            >
              Ascending
            </p>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <h6 style={{ textAlign: "center" }}>Loading the articles</h6>
      ) : null}
      <section>
        <div className="container text-center">
          <div className="row" style={{ paddingBottom: "2%" }}>
            {articles.map((article) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
                  style={{ justifyContent: "center", marginBottom: "3%" }}
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
