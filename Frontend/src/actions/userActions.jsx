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

export const addNote = (noteData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    // Ensure the token is available before making the request
    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform API call to add a note
    const response = await axios.post(
      "http://localhost:5000/users/addNote",
      noteData,
      config // Include the config with headers
    );

    // Handle success (e.g., show a success message to the user)
    console.log(response.data);

    // You can dispatch an action here if needed
    // dispatch({ type: "ADD_NOTE_SUCCESS" });
  } catch (error) {
    // Handle error (e.g., display an error message to the user)
    console.error(error);
    // You can dispatch an action here if needed
    // dispatch({ type: "ADD_NOTE_FAILURE", error });
  }
};

// Add this action to userActions.js
export const getAllNotes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    // Ensure the token is available before making the request
    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform API call to get all notes
    const response = await axios.get(
      "http://localhost:5000/users/getAllNote",
      config
    );

    // Dispatch the notes to the state
    dispatch({
      type: "GET_ALL_NOTES_SUCCESS",
      notes: response.data.notes,
    });
  } catch (error) {
    // Handle error (e.g., display an error message to the user)
    console.error(error);
    // You can dispatch an action here if needed
    // dispatch({ type: "GET_ALL_NOTES_FAILURE", error });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/users/deleteNote/${noteId}`,
      config
    );

    // After successful deletion, refetch all notes to update the state
    dispatch(getAllNotes());
  } catch (error) {
    console.error(error);
    // Handle error, such as displaying an error message to the user
  }
};

// Update a note by ID
// userActions.js

export const updateNote = (noteId, updatedNoteData) => async (dispatch) => {
  try {
    // Make an API call to update the note on the server
    const response = await fetch(`http://localhost:5000/users/updateNote/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
      },
      body: JSON.stringify(updatedNoteData),
    });

    if (!response.ok) {
      throw new Error('Note update failed');
    }

    // Dispatch an action to update the note in the Redux store
    dispatch({ type: 'UPDATE_NOTE', payload: { noteId, updatedNoteData } });

    return true; // Indicate success
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
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
