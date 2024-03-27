export default function ArticleHeader({ title, author }) {
  return (
    <header
      style={{
        paddingTop: "0",
        paddingLeft: "7%",
        paddingRight: "7%",
        marginTop: "10px",
      }}
    >
      <h2 className="header">{title}</h2>
      <h6 className="header">Written by {author}</h6>
    </header>
  );
}
