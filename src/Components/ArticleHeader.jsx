export default function ArticleHeader({ title, author }) {
  return (
    <header
      style={{ paddingTop: "5em", paddingLeft: "7%", paddingRight: "7%" }}
    >
      <h2 className="header">{title}</h2>
      <h6 className="header">Written by {author}</h6>
    </header>
  );
}
