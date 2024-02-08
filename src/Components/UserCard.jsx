import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function UserCard({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  return (
    <div className="card-body" style={{ textAlign: "center" }}>
      <h5 className="card-title">
        {user.username}{" "}
        <img
          src={user.avatar_url}
          style={{ height: "3rem", width: "3rem" }}
          alt={`avatar for ${user.username}`}
        />
      </h5>
      {user.username !== loggedInUser.username ? (
        <button
          className="btn btn-primary"
          onClick={() => {
            setLoggedInUser(user);
          }}
        >
          Log in
        </button>
      ) : (
        <button type="button" className="btn btn-secondary">
          Logged In
        </button>
      )}
    </div>
  );
}
