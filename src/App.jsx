import { useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import ListOfArticles from "./Components/ListOfArticles";
import ArticlePage from "./Components/ArticlePage";
import UserContext from "./Contexts/UserContext";
import Users from "./Components/Users";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ListOfArticles />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/topics/:topic" element={<ListOfArticles />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
