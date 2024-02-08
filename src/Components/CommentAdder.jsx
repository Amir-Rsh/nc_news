import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { postComment, getComments } from "../../api";
import { useParams } from "react-router-dom";

export default function CommentAdder({ setCommentList }) {
  const [userInput, setUserInput] = useState("");
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  function handleChange(event) {
    setUserInput(event.target.value);
  }
  function handlePost() {
    const pendingMsg = document.getElementById("postPending");
    const error = document.getElementById("commentError");
    if (userInput.length < 4) {
      error.innerText = "Please write at least 4 characters";
    } else {
      pendingMsg.innerText = "your comment is being posted";
      error.innerText = "";

      postComment(article_id, loggedInUser.username, userInput)
        .then(({ data: { comment } }) => {
          setCommentList((currentComments) => [comment, ...currentComments]);
          setUserInput("");
          setIsError(false);
          pendingMsg.innerText = "";
        })
        .catch((err) => {
          setIsError(true);
        });
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        width: "60%",
        margin: "auto",
        paddingTop: "2%",
      }}
    >
      <h4>Post a comment</h4>
      <label htmlFor="commentText" className="form-label">
        {loggedInUser.username}:
      </label>
      <textarea
        className="form-control"
        placeholder="Write your comment here..."
        id="commentText"
        rows="3"
        value={userInput}
        onChange={handleChange}
      ></textarea>
      <p id="commentError"></p>
      <button
        type="button"
        className="btn btn-primary"
        style={{ margin: "2%" }}
        onClick={handlePost}
      >
        Post
      </button>
      <p id="postPending" style={{ textAlign: "center" }}></p>
      {isError ? (
        <p style={{ textAlign: "center" }}>your comment cannot be posted</p>
      ) : null}
    </div>
  );
}
