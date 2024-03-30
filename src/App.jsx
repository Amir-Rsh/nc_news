import { useState } from "react";
import Nav from "./Components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import ListOfArticles from "./Components/ListOfArticles";
import ArticlePage from "./Components/ArticlePage";
import UserContext from "./Contexts/UserContext";
import ErrorPage from "./Components/ErrorPage";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/RegisterPage";

function App() {
  const myEnvVar = process.env.REACT_APP_API_KEY;
  console.log(myEnvVar);

  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />

          <Route
            path="/articles"
            element={
              <>
                <Nav />
                <ListOfArticles />
              </>
            }
          />
          <Route
            path="/articles/:article_id"
            element={
              <>
                <Nav></Nav>
                <ArticlePage />
              </>
            }
          />
          <Route
            path="/topics/:topic"
            element={
              <>
                <Nav />
                <ListOfArticles />
              </>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
