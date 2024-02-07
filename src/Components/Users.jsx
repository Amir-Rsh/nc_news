import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import UserCard from "./UserCard";

export default function Users() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUsers().then(({ data: { users } }) => {
      setUserList(users);
    });
  }, []);
  return (
    <>
      <header>
        <h1 className="header">Change User</h1>
      </header>
      <div className="card">
        <h5 className="card-header">User list</h5>
        {userList.map((user) => {
          return <UserCard user={user} key={user.username} />;
        })}
      </div>
    </>
  );
}
