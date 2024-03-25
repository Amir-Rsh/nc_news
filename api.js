import axios from "axios";

export default function getArticles(topic, sort_by, order) {
  return axios.get("https://nc-news-by-amir.onrender.com/api/articles", {
    params: { topic: topic, sort_by: sort_by, order: order },
  });
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

export function postComment(id, username, body, setCommentList) {
  return axios.post(
    `https://nc-news-by-amir.onrender.com/api/articles/${id}/comments`,
    {
      username: username,
      body: body,
    }
  );
}

export function deleteComment(id) {
  return axios.delete(
    `https://nc-news-by-amir.onrender.com/api/comments/${id}`
  );
}

export function postUser(
  uid,
  username,
  name,
  avatar_url,
  navigate,
  setCreating
) {
  return axios
    .post(`https://nc-news-by-amir.onrender.com/api/users`, {
      user_id: uid,
      username: username,
      name: name,
      avatar_url: avatar_url,
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setCreating(false);

      console.log(err);
    });
}

export function getUserByUserId(user_id, setLoggedInUser) {
  return axios
    .get(`https://nc-news-by-amir.onrender.com/api/users/${user_id}`)
    .then((response) => {
      setLoggedInUser(response.data.user);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function checkUsername(
  username,
  setUserError,
  setUserChecker,
  setUserConfirmed
) {
  return axios
    .post(`https://nc-news-by-amir.onrender.com/api/users`, {
      username: username,
    })
    .then(() => {})
    .catch((err) => {
      setUserChecker(false);
      if (err.response.data.msg === "username already exists") {
        setUserError(true);
      } else {
        setUserConfirmed(true);
      }
    });
}
