import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { postComment } from "../../api";
import { useParams } from "react-router-dom";

export default function CommentAdder() {
  const { article_id } = useParams();
  const [userInput, setUserInput] = useState("");
  const { loggedInUser } = useContext(UserContext);
  function handleChange(event) {
    setUserInput(event.target.value);
  }
  function handlePost() {
    postComment(article_id, loggedInUser.username, userInput);

    setUserInput("");
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
        required
      ></textarea>
      <button
        type="button"
        className="btn btn-primary"
        style={{ margin: "2%" }}
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
}
