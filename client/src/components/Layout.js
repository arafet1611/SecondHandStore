import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
