import { useEffect, useState } from "react";
import { getArticlesById } from "../../api";
import ArticleHeader from "./ArticleHeader";

export default function ArticlePage({ articleId }) {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticlesById(articleId).then(({ data: { article } }) => {
      setContent(article);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <h6>Article is loading</h6>
  ) : (
    <>
      <ArticleHeader title={content.title} author={content.author} />

      <div class="card" style={{ width: "70%" }}>
        <img src={content.article_img_url} class="card-img-top" alt="..." />
        <div class="card-body">
          <p class="card-text">{content.body}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            this article has {content.votes} votes
          </li>
        </ul>
      </div>
    </>
  );
}
