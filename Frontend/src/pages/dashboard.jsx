import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../actions/authActions'; 

const Dashboard = () => { // Make sure the component name is capitalized
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser());
  };

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // You can use a router library like react-router for this
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Dashboard; // Make sure to use "Dashboard" instead of "dashboard"
