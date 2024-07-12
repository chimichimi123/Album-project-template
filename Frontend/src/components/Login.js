// Login.js
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import "./CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button onClick={handleLogin} className="form-button">
          Login
        </button>
        <div className="register-link">
          <p>If you don't already have an account, create one here!</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="form-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
