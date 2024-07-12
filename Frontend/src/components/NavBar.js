// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./CSS/NavBar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/albums">
            Albums
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/members">
            Members
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reviews">
            Reviews
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
