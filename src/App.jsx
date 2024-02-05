import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import ListOfArticles from "./Components/ListOfArticles";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-by-amir.onrender.com/api/articles")
      .then((response) => {
        setArticles(response.data.articles);
      });
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<ListOfArticles articles={articles} />} />
      </Routes>
    </>
  );
}

export default App;
