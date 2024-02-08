import { useContext, useEffect, useState } from "react";
import { deleteComment, getComments } from "../../api";
import UserContext from "../Contexts/UserContext";
import CommentAdder from "./CommentAdder";

export default function Comments({ article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getComments(article_id).then((response) => {
      setCommentList(response.data.comments);
    });
  }, []);
  function handleDelete(event) {
    const pendingMsg = document.getElementById(event.target.value);
    pendingMsg.innerText = "comment is being removed";
    deleteComment(event.target.value)
      .then(() => {
        setIsError(false);
        setCommentList((currentCommentList) =>
          currentCommentList.filter(
            (comment) => comment.comment_id !== parseInt(event.target.value)
          )
        );
      })
      .catch((err) => {
        setIsError(true);
      });
  }

  return (
    <>
      <CommentAdder setCommentList={setCommentList} />
      <h3 className="header" style={{ paddingTop: "3%" }}>
        Comments:
      </h3>
      {commentList.length === 0 ? (
        <h5
          style={{
            textAlign: "center",
            paddingTop: "4%",
            paddingBottom: "12%",
          }}
        >
          this article has no comments
        </h5>
      ) : (
        commentList.map((comment) => {
          return (
            <div
              className="card w-70 mb-3"
              style={{ width: "70%", margin: "auto" }}
              key={comment.comment_id}
            >
              <div className="card-body">
                <h5 className="card-title">{comment.author}:</h5>
                <p className="card-text">{comment.body}</p>
                <p className="card-text" style={{ textAlign: "right" }}>
                  votes: {comment.votes}
                </p>
                {loggedInUser.username === comment.author ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger"
                      value={comment.comment_id}
                      onClick={handleDelete}
                    >
                      Delete your comment
                    </button>
                    <p id={comment.comment_id}></p>
                  </>
                ) : null}
                {isError ? (
                  <p style={{ textAlign: "center" }}>
                    Comment could not be deleted at this time
                  </p>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
