import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import ListOfArticles from "./Components/ListOfArticles";
import getArticles from "../api";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<ListOfArticles articles={articles} />} />
      </Routes>
      {isLoading ? <h5>Loading the articles</h5> : null}
    </>
  );
}

export default App;
