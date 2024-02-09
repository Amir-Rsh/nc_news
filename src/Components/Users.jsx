import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import UserCard from "./UserCard";

export default function Users() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    setIsError(false);
    getUsers()
      .then(({ data: { users } }) => {
        setUserList(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);
  return (
    <>
      <header style={{ paddingTop: "4em" }}>
        <h1 className="header">Change User</h1>
      </header>
      <div className="card" id="userList" style={{ margin: "auto" }}>
        <h5 className="card-header" style={{ textAlign: "center" }}>
          User list
        </h5>
        {isLoading ? (
          <p style={{ textAlign: "center" }}>Users are loading</p>
        ) : null}
        {isError ? (
          <p style={{ textAlign: "center" }}>
            Users could not be retrieved at this moment
          </p>
        ) : null}
        {userList.map((user) => {
          return <UserCard user={user} key={user.username} />;
        })}
      </div>
    </>
  );
}
