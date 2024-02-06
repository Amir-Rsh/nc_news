import { useEffect, useState } from "react";
import { getArticlesById } from "../../api";
import ArticleHeader from "./ArticleHeader";

export default function ArticlePage({ articleId }) {
  const [content, setContent] = useState({});
  useEffect(() => {
    getArticlesById(articleId).then(({ data: { article } }) => {
      setContent(article);
    });
  }, []);

  return (
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
