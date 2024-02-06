import { useEffect, useState } from "react";
import { getArticlesById } from "../../api";
import ArticleHeader from "./ArticleHeader";
import { useParams } from "react-router";

export default function ArticlePage({}) {
  const { article_id } = useParams();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticlesById(article_id).then(({ data: { article } }) => {
      setContent(article);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <h6>Article is loading</h6>
  ) : (
    <>
      <ArticleHeader title={content.title} author={content.author} />

      <div className="card" style={{ width: "70%" }}>
        <img src={content.article_img_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{content.body}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            this article has {content.votes} votes
          </li>
        </ul>
      </div>
    </>
  );
}
