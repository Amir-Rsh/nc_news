import { useEffect, useState } from "react";
import { getComments } from "../../api";

export default function Comments({ article_id }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    getComments(article_id).then((response) => {
      setCommentList(response.data.comments);
    });
  }, []);
  return (
    <>
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
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
