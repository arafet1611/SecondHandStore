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
    <div style={{ backgroundColor: "#666666" }}>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form"
              onSubmit={handleLogin}
            >
              <span className="login100-form-title p-b-43">
                Login to continue!
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {!email ? (
                  <span className="label-input100">email</span>
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

              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="#" className="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
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

export default Login;
