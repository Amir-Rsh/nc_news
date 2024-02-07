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

export function voteArticle(id, voteNum) {
  return axios.patch(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/`,
    { inc_votes: voteNum }
  );
}

export function getUsers() {
  return axios.get("https://nc-news-by-amir.onrender.com/api/users");
}

export function postComment(id, username, body) {
  axios.post(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/comments`,
    { username: username, body: body }
  );
}
