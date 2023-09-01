import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActions";
// import '../assets/styles/main.css'

export default function SignupForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData));
  };

  let errorMessage = error ? error.message : "";

  if (error && error.message === "Request failed with status code 404") {
    errorMessage = "Username already exists";
  }

  return (
      <div className="home-background">
      <h2>Signup</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Sign Up</button>
      </form>
      </div>
  );
}
