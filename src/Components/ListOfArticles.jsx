import { useState } from "react";
import ArticleCard from "./ArticleCard";
import HomeHeader from "./HomeHeader";
import ArticlePage from "./ArticlePage";

export default function ListOfArticles({ articles }) {
  const [articleId, setArticleId] = useState(undefined);
  function handleClick() {}
  return articleId ? (
    <ArticlePage articleId={articleId} />
  ) : (
    <>
      <HomeHeader />
      <section>
        <div className="container text-center">
          <div className="row">
            {articles.map((article) => {
              return (
                <div className="col" key={article.article_id}>
                  <ArticleCard article={article} setArticleId={setArticleId} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
