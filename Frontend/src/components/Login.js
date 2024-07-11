// Login.js
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div style={{ marginTop: "20px" }}>
        <p>If you don't already have an account create one here!</p>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button style={{ color: "inherit" }}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
