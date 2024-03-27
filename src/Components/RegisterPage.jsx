// import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { checkUsername, postUser } from "../../api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailError2, setEmailError2] = useState(false);
  const [userError, setUserError] = useState(false);
  const [userChecker, setUserChecker] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [creating, setCreating] = useState(false);

  function handleUserExist(event) {
    setUserConfirmed(false);
    setUserChecker(true);
    setUserError(false);
    checkUsername(
      event.target.value,
      setUserError,
      setUserChecker,
      setUserConfirmed
    );
  }

  function handleSelect(event) {
    setDetails((currentDetails) => {
      const newUrl = { ...currentDetails };
      newUrl.avatar_url = event.target.value;
      setDetails(newUrl);
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setEmailError(false);
    setEmailError2(false);
    setPassError(false);
    setCreating(true);

    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((cred) => {
        postUser(
          cred.user.uid,
          details.username,
          details.fullName,
          details.avatar_url,
          navigate,
          setCreating
        );
      })

      .catch((err) => {
        setCreating(false);

        if (
          err.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setPassError(true);
        }
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          setEmailError(true);
        }
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setEmailError2(true);
        }
      });
  }
  function handleChange(event) {
    setDetails((currentDetails) => {
      const newDetails = { ...currentDetails };
      newDetails[event.target.id] = event.target.value;
      return newDetails;
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
        <h1>Create An Account</h1>

        <div>
          <form id="login" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input required id="fullName" type="text" onChange={handleChange} />
            <label htmlFor="username">Username</label>
            <input
              required
              id="username"
              onBlur={handleUserExist}
              type="text"
              onChange={handleChange}
            />
            {userError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                username already exists
              </p>
            ) : null}
            {userChecker ? (
              <>
                <p id="checker" style={{ color: "orange", marginBottom: "0" }}>
                  checking username availability
                </p>
              </>
            ) : null}
            {userConfirmed ? (
              <p
                style={{
                  color: "lightgreen",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                username is good to go
              </p>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type="password"
              onChange={handleChange}
            />
            {passError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                password must contain at least 6 characters
              </p>
            ) : null}
            <label htmlFor="email">Email</label>
            <input required id="email" type="email" onChange={handleChange} />
            {emailError ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                please enter a valid email
              </p>
            ) : null}
            {emailError2 ? (
              <p style={{ color: "orange", marginBottom: "0" }}>
                email is already in use
              </p>
            ) : null}
            <p style={{ marginBottom: "0px", marginTop: "5px" }}>
              Choose you avatar
            </p>
            <div>
              <label htmlFor="avatar1">
                {" "}
                <img
                  src="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
                  alt=""
                  width="50px"
                  height="50px"
                  className="avatarPics"
                />
              </label>
              <input
                className="avatars"
                required
                name="avatars"
                type="radio"
                id="avatar1"
                value="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
                onChange={handleSelect}
              />
              <label htmlFor="avatar2">
                {" "}
                <img
                  className="avatarPics"
                  src="https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </label>
              <input
                className="avatars"
                required
                name="avatars"
                type="radio"
                id="avatar2"
                value="https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
                onChange={handleSelect}
              />
              <label htmlFor="avatar3">
                {" "}
                <img
                  className="avatarPics"
                  src="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </label>
              <input
                className="avatars"
                required
                name="avatars"
                type="radio"
                id="avatar3"
                value="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
                onChange={handleSelect}
              />
              <label htmlFor="avatar4">
                {" "}
                <img
                  className="avatarPics"
                  src="https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </label>
              <input
                className="avatars"
                required
                name="avatars"
                type="radio"
                id="avatar4"
                value="https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
                onChange={handleSelect}
              />
            </div>

            <button type="submit" id="loginButton">
              sign up
            </button>
            {creating ? (
              <p
                style={{
                  color: "lightgreen",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                creating your account. please wait
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}
