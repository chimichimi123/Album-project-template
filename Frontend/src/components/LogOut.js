// Logout.js
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Logout;
