export default function ErrorPage({ message }) {
  return message ? (
    <h5 style={{ textAlign: "center", paddingTop: "20%" }}>{message}</h5>
  ) : (
    <h5 style={{ textAlign: "center", paddingTop: "20%" }}>
      This page does not exist please return to home page or enter a valid URL
    </h5>
  );
}
