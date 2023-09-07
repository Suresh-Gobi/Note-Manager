import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "../assets/styles/main.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      await dispatch(loginUser({ email, password }));
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="home-background">
        <div className="home">
          <Link to="/" style={{ color: "white" }}>
            <i className="fa fa-home fa-2x" alt="Home"></i>
          </Link>
        </div>
        <div className="screen-center">
          <div className="from-cards">
            <h2>Login</h2>
            <hr />
            {error && (
              <div className="alert-log">
                <span className="close-button" onClick={() => setError("")}>
                  &times;
                </span>
                <p>{error}</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-center">
              <button
                className="button-29"
                onClick={handleLogin}
                disabled={isLoading}
              >
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
                  "Login"
                )}
              </button>
            </div>
            <div className="account">
              <p>or</p>
              <h6>
                New to Note-Manager? <br />
                <br />
                <Link to="/signup">Create an account</Link>{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
