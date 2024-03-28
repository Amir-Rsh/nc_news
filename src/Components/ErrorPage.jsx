import { useNavigate } from "react-router-dom";

export default function ErrorPage({ message }) {
  const navigate = useNavigate();
  return message ? (
    <h5 style={{ textAlign: "center", paddingTop: "20%" }}>{message}</h5>
  ) : (
    <>
      <h5 style={{ textAlign: "center", paddingTop: "20%" }}>
        This page does not exist <br />
      </h5>
      <p
        onClick={() => {
          navigate("/articles");
        }}
        style={{
          color: "black",
          cursor: "pointer",
          marginRight: "auto",
          marginLeft: "auto",

          width: "fit-content",
          justifySelf: "center",

          backgroundColor: "salmon",
          padding: "5px",
          borderRadius: "6%",
          fontWeight: "bold",
        }}
      >
        Go to articles{" "}
      </p>
    </>
  );
}
