import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import UserCard from "./UserCard";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUsers().then(({ data: { users } }) => {
      setUserList(users);
      setIsLoading(false);
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
        {userList.map((user) => {
          return <UserCard user={user} key={user.username} />;
        })}
      </div>
    </>
  );
}
