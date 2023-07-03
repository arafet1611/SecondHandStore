import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("api/users/login", {
        email,
        password,
      });
      if (data.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        console.log("Login successful:", data.user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div className="formGroup">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default Login;
