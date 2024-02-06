export default function ArticleHeader({ title, author }) {
  return (
    <header>
      <h2 className="header">{title}</h2>
      <h6 className="header">Written by {author}</h6>
    </header>
  );
}
