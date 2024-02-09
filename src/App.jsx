import { useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import ListOfArticles from "./Components/ListOfArticles";
import ArticlePage from "./Components/ArticlePage";
import UserContext from "./Contexts/UserContext";
import Users from "./Components/Users";

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
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ListOfArticles />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:topic" element={<ListOfArticles />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
