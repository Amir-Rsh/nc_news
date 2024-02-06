import axios from "axios";

export default function getArticles() {
  return axios.get("https://nc-news-by-amir.onrender.com/api/articles");
}
