import React from "react";
import "./Sidebar.css"; // Import the CSS file for additional styling if needed
import { AiFillHome } from "react-icons/ai";
import profilPic from "../assets/profile.png";

function Sidebar() {
  // Define inline styles for elements
  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
  };

  const profileStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const nameStyle = {
    fontSize: "20px",
    margin: "10px 0",
  };

  const mainFieldStyle = {
    marginTop: "20px",
  };

  const listItemStyle = {
    listStyleType: "none",
    padding: "5px 0",
  };

  return (
    <div className="container">
      <div className="sidebar" style={sidebarStyle}>
        <div className="profile" style={profileStyle}>
          <img src={profilPic} alt="Profile" className="img-fluid" />
          <h3 className="name" style={nameStyle}>
            Craig David
          </h3>
          <span className="country">Web Designer</span>
        </div>
        <div className="main-field" style={mainFieldStyle}>
          <h4>
            <AiFillHome /> Accueil
          </h4>
          <h4>Gestion des colis</h4>
          <ul>
            <li style={listItemStyle}>Ajouter colis</li>
            <li style={listItemStyle}>Liste des colis</li>
          </ul>
          <h4>Gestion des comptes</h4>
          <ul>
            <li style={listItemStyle}>Mon compte</li>
          </ul>
        </div>
      </div>
      <div className="content">{/* Your content goes here */}</div>
    </div>
  );
}

export default Sidebar;
