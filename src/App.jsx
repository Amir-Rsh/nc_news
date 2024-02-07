import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import ListOfArticles from "./Components/ListOfArticles";
import getArticles from "../api";
import ArticlePage from "./Components/ArticlePage";
import UserContext from "./Contexts/UserContext";
import Users from "./Components/Users";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  useEffect(() => {
    getArticles().then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Nav />
        <Routes>
          <Route path="/" element={<ListOfArticles articles={articles} />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
        {isLoading ? <h5>Loading the articles</h5> : null}
      </UserContext.Provider>
    </>
  );
}

export default App;
