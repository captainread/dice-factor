import { useContext, useEffect, useState } from "react";

import { UserContext } from "../utilities/contexts";
import { fetchUsers } from "../utilities/api";

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(user);
  const [showMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((retrievedUsers) => {
      setUsers(retrievedUsers);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  const userMessage = () => {
    if (user) {
      return <h2>Welcome back, {user}.</h2>;
    } else {
      return <h2>Please sign in:</h2>;
    }
  };

  return (
    <main>
      {userMessage()}
      <div id="user-drop-down">
        <select
          onChange={(event) => {
            setSelectedUser(event.target.value);
          }}
        >
          <option selected={true} disabled="disabled">
            Select user
          </option>
          {users.map(({ username }) => {
            return (
              <option key={username} value={username}>
                {username}
              </option>
            );
          })}
        </select>
        <button
          id="user-drop-down-btn"
          onClick={() => {
            setUser(selectedUser);
            showMessage(true);
          }}
        >
          Sign in
        </button>
      </div>
    </main>
  );
}
