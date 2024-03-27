import { useNavigate } from "react-router-dom";

export default function ErrorPage({ message }) {
  const navigate = useNavigate();
  return message ? (
    <h5 style={{ textAlign: "center", paddingTop: "20%" }}>{message}</h5>
  ) : (
    <h5 style={{ textAlign: "center", paddingTop: "20%" }}>
      This page does not exist{" "}
      <span
        onClick={() => {
          navigate("/articles");
        }}
        style={{
          color: "black",
          textAlign: "center",
          cursor: "pointer",
          marginLeft: "10px",
          marginRight: "10px",

          backgroundColor: "salmon",
          padding: "5px",
          borderRadius: "6%",
          fontWeight: "bold",
        }}
      >
        Go to articles{" "}
      </span>
    </h5>
  );
}
