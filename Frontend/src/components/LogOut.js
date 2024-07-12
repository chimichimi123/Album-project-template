// Logout.js
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./CSS/LogOut.css";

const Logout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="logout-container">
      {isAuthenticated ? (
        <div className="logout-message">
          <p>You are logged in.</p>
          <button onClick={handleLogout} className="form-button">
            Logout
          </button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Logout;
