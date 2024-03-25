import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { getUserByUserId } from "../../api";
import { signOut } from "firebase/auth";

export default function Nav() {
  const navigate = useNavigate();
  const user = useAuthState(auth);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user[0]) {
      getUserByUserId(user[0].uid, setLoggedInUser).then(() => {
        setIsLoading(false);
      });
    }
  }, [user[0]]);

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {" "}
      <nav
        className="navbar bg-primary"
        id="nav"
        data-bs-theme="dark"
        style={{
          position: "fixed",
          zIndex: "1000",
          width: "100%",
          margin: "0",
          height: "60px",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{
              color: "black",
              fontWeight: "bold",
              paddingBottom: "30px",
            }}
          >
            Northcoders News
          </a>

          {isLoading ? (
            <p
              className="navbar-brand"
              style={{
                cursor: "default",
                color: "black",
                marginTop: "-11px",

                fontWeight: "bold",
              }}
            >
              please
              <span
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  color: "black",
                  textAlign: "center",
                  cursor: "pointer",
                  marginLeft: "10px",
                  marginRight: "10px",

                  backgroundColor: "salmon",
                  padding: "5px",
                  borderRadius: "6%",
                  fontWeight: "bold",
                }}
              >
                Log in{" "}
              </span>
              to comment
            </p>
          ) : (
            <p
              className="navbar-brand"
              style={{
                cursor: "default",
                color: "black",
                marginTop: "-7px",

                fontWeight: "bold",
              }}
            >
              Hi, {loggedInUser.username}
              <img
                src={loggedInUser.avatar_url}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "15%",
                  marginLeft: "5px",
                }}
                alt={`avatar for ${loggedInUser.username}`}
              />{" "}
              <span
                style={{
                  color: "black",
                  textAlign: "center",
                  cursor: "pointer",
                  marginLeft: "10px",
                  backgroundColor: "salmon",
                  padding: "5px",
                  borderRadius: "6%",
                }}
                onClick={handleLogOut}
              >
                Log out
              </span>
            </p>
          )}
        </div>
      </nav>
    </>
  );
}
