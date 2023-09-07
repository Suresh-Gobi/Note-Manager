import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "../assets/styles/main.css";

export default function SignupForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(signup(userData))
      .then(() => {
        setIsSuccessVisible(true); 
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        setIsErrorVisible(true);
        let errorMessage = error ? error.message : "";
        if (error && error.message === "Request failed with status code 404") {
          errorMessage = "Username already exists";
        }
        setErrorMessage(errorMessage);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    setIsErrorVisible(!!error);
    setIsSuccessVisible(!!error === false);
  }, [error]);

  const handleCloseError = () => {
    setIsErrorVisible(false);
  };

  return (
    <div className="home-background">
      <div className="home">
        <Link to="/" style={{ color: "white" }}>
          <i className="fa fa-home fa-2x" alt="Home"></i>
        </Link>
      </div>
      <div className="screen-center">
        <div className="from-cards">
          <h2>Signup</h2>

          <hr />

          {isErrorVisible && (
            <div className="alert">
              <span className="close-button" onClick={handleCloseError}>
                &times;
              </span>
              <p>{errorMessage}</p>
            </div>
          )}

          {isSuccessVisible && (
            <div className="alert success">
              <p>Account created successfully!</p>
              <Link to="/login">Go to Login</Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="button-center">
              <button type="submit" className="button-29" disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader
                    css={css`
                      display: block;
                      margin: 0 auto;
                      border-color: red;
                    `}
                    size={25}
                    color={"black"}
                    loading={true}
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <div className="account">
              <p>or</p>
              <h6>
                Already have an account? <Link to="/login">Login</Link>{" "}
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
