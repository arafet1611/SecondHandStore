import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = window.localStorage.getItem("user");
  console.log(storedUser);

  const user = JSON.parse(storedUser);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">Home</Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-item">
            <Link to="/ads">Advertisements</Link>
          </div>
          {user ? (
            <>
              <div className="navbar-item">
                <Link to="/profil/mylist">My Products</Link>
              </div>
              <div className="navbar-item">Welcome, {user.name}</div>
              <div className="navbar-item">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-item">
                <Link to="/login">Login</Link>
              </div>
              <div className="navbar-item">
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
          <div className="navbar-item">
            <Link to="/ad-listing">Publish Ad</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
