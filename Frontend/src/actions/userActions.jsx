import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const signup = (userData) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5000/users/create", userData);
      dispatch({ type: "SIGNUP_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR", error });
    }
  };
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    // Perform API call to authenticate user
    const response = await axios.post(
      "http://localhost:5000/users/login",
      userData
    );
    const token = response.data.token;

    // Decode the JWT token to access user data
    const decodedToken = jwt_decode(token);
    const { email, username } = decodedToken; // Extract email and username

    // Save token to local storage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    dispatch({
      type: "LOGIN_SUCCESS",
      user: {
        email,
        username,
      },
    });

    // Redirect the user to the dashboard page (if using a router library)
    // navigate('/dashboard');
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  dispatch({ type: "LOGOUT" });
  // Redirect the user to the login page
  // You can use a router library like react-router for this
};
