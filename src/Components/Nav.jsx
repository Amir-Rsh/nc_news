import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

export default function Nav() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ paddingRight: "2%" }}>
          Welcome to Northcoder News
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <a className="navbar-brand">
            Hi, {loggedInUser.username}
            <img
              src={loggedInUser.avatar_url}
              style={{ width: "2rem", height: "2rem" }}
              alt={`avatar for ${loggedInUser.username}`}
            />
          </a>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/">
              <li className="nav-item" style={{ color: "black" }}>
                Home
              </li>
            </Link>
            <Link to="/users">
              <li className="nav-item" style={{ color: "black" }}>
                Change user
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
