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
