import ArticleCard from "./ArticleCard";
import HomeHeader from "./HomeHeader";

export default function ListOfArticles({ articles }) {
  return (
    <>
      <HomeHeader />
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
