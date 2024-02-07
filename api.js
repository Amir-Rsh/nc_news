import axios from "axios";

export default function getArticles() {
  return axios.get("https://nc-news-by-amir.onrender.com/api/articles");
}

export function getArticlesById(id) {
  return axios.get(`https://nc-news-by-amir.onrender.com/api/articles/${id}`);
}

export function getComments(id) {
  return axios.get(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/comments`
  );
}

export function upvoteArticle(id) {
  return axios.patch(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/`,
    { inc_votes: 1 }
  );
}

export function downoteArticle(id) {
  return axios.patch(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/`,
    { inc_votes: -1 }
  );
}
