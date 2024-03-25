import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { getUserByUserId } from "../../api";

export default function HomePage({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});
  function handleSignIn(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((cred) => {
        console.log(cred.user);
        getUserByUserId(cred.user.uid, setLoggedInUser).then(() => {
          navigate("/articles");
        });
      })
      .catch((err) => {
        console.log(err);
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
        />
        <div>
          <form id="login" onSubmit={handleSignIn} action="">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input id="password" type="text" onChange={handleChange} />
            <button id="loginButton">Login</button>
            <p style={{ marginTop: "10px" }}>
              Don't have an account? Register{" "}
              <span>
                <Link style={{ color: "black" }} to={"/signup"}>
                  here
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
