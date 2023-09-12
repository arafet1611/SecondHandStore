import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
        address,
      });

      if (data.user) {
        navigate("/login");
        console.log("Register successful:", data.user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Error signing up");
    }
  };
  return (
    <div style={{ backgroundColor: "#666666" }}>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form"
              onSubmit={handleRegister}
            >
              <span className="login100-form-title p-b-43">
                Create account!{" "}
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {!name ? (
                  <span className="label-input100">full name</span>
                ) : (
                  <span className="label-input100"></span>
                )}{" "}
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  type="text"
                  value={address}
                  name="email"
                  onChange={(e) => setAddress(e.target.value)}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {!address ? (
                  <span className="label-input100">address</span>
                ) : (
                  <span className="label-input100"></span>
                )}
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {!password ? (
                  <span className="label-input100">email</span>
                ) : (
                  <span className="label-input100"></span>
                )}
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  type="text"
                  value={password}
                  name="email"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {!password ? (
                  <span className="label-input100">Password</span>
                ) : (
                  <span className="label-input100"></span>
                )}
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Signup
                </button>
              </div>
            </form>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}

            <div
              className="login100-more"
              style={{ backgroundImage: "url('images/bg-01.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
