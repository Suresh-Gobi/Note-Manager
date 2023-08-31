import axios from 'axios';

export const signup = (userData) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:5000/users/create', userData);
      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR', error });
    }
  };
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    // Perform API call to authenticate user
    const response = await axios.post('http://localhost:5000/users/login', userData);
    const token = response.data.token;

    // Save token to local storage
    localStorage.setItem('token', token);

    dispatch({ type: 'LOGIN_SUCCESS' });
    // Redirect the user to the dashboard page
    // You can use a router library like react-router for this
    // window.location('/signup');
    alert('logged');
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear token from local storage
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
  // Redirect the user to the login page
  // You can use a router library like react-router for this
};
