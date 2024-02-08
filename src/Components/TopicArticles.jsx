import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../../api";
import ArticleCard from "./ArticleCard";

export default function TopicArticles() {
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  useEffect(() => {
    getArticlesByTopic(topic).then((response) => {
      setTopicArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <header className="header" style={{ padding: "3%" }}>
        <h2>Articles on {topic}</h2>
      </header>
      {isLoading ? <h6>Loading the articles</h6> : null}
      <section>
        <div className="container text-center">
          <div className="row" style={{ paddingBottom: "2%" }}>
            {topicArticles.map((article) => {
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
