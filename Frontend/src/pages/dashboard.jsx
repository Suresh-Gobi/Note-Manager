import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // You can use a router library like react-router for this
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* <p>Welcome, {user.username}!</p> */}
      <p>Welcome, {user.username || "Guest"}!</p>
      <p>Email: {user.email || "N/A"}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
