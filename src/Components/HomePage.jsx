import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { getUserByUserId } from "../../api";

export default function HomePage({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});
  const [logError, setLogError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function handleSignIn(event) {
    setLogError(false);
    setEmailError(false);
    setPassError(false);
    setRedirect(true);

    event.preventDefault();
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((cred) => {
        getUserByUserId(cred.user.uid, setLoggedInUser).then(() => {
          navigate("/articles");
        });
      })
      .catch((err) => {
        setRedirect(false);
        if (err.message === "Firebase: Error (auth/missing-email).") {
          setEmailError(true);
        } else if (
          err.message === "Firebase: Error (auth/invalid-credential)."
        ) {
          setLogError(true);
        } else if (err.message === "Firebase: Error (auth/missing-password).") {
          setPassError(true);
        } else {
          setLogError(true);
        }
      });
  }
  function handleChange(event) {
    setUserInput((currentUserInput) => {
      const newInput = { ...currentUserInput };
      newInput[event.target.id] = event.target.value;
      setUserInput(newInput);
    });
  }
  return (
    <>
      <div
        style={{
          margin: "90px auto auto auto",
          textAlign: "center",
          width: "fit-content",
        }}
      >
        <h1>WELCOME TO NC NEWS</h1>
        <img
          src="https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif"
          alt=""
          style={{
            width: "300px",
            borderRadius: "100%",
            borderWidth: "100px",
          }}
        />
        <div>
          <form id="login" onSubmit={handleSignIn} action="">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              onChange={handleChange}
              onBlur={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              onChange={handleChange}
              onBlur={handleChange}
            />
            <button id="loginButton">Login</button>
            {logError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                your details are incorrect
              </p>
            ) : null}
            {emailError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                please re-enter your email
              </p>
            ) : null}
            {passError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                please input the correct password
              </p>
            ) : null}
            {redirect ? (
              <p
                style={{
                  color: "lightgreen",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                logging you in please wait
              </p>
            ) : null}
            <p style={{ marginTop: "10px", marginBottom: "0" }}>
              Don't have an account? Register{" "}
              <span>
                <Link style={{ color: "black" }} to={"/signup"}>
                  here
                </Link>
              </span>
              <p style={{ marginBottom: "0" }}>or</p>
            </p>
            <p>
              <span>
                <Link style={{ color: "black" }} to={"/articles"}>
                  Continue
                </Link>
              </span>{" "}
              as guest{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
