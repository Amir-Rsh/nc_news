import ArticleCard from "./ArticleCard";
import HomeHeader from "./HomeHeader";

export default function ListOfArticles({ articles }) {
  return (
    <>
      <HomeHeader />
      <section>
        <div className="container text-center">
          <div className="row">
            {articles.map((article) => {
              return (
                <div className="col" key={article.article_id}>
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
