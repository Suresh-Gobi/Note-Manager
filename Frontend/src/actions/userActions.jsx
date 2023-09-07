import axios from "axios"; // Import Axios lib
import jwt_decode from "jwt-decode"; // Import JWT for decoding JWT tokens

// Action to sign up a user
export const signup = (userData) => {
  return async (dispatch) => {
    try {
      // POST request to create a new user
      await axios.post("https://note-manager-backend.onrender.com/users/create", userData);
      dispatch({ type: "SIGNUP_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR", error });
    }
  };
};

// Action to login a user
export const loginUser = (userData) => async (dispatch) => {
  try {
    // Perform an API call to authenticate the user
    const response = await axios.post(
      "https://note-manager-backend.onrender.com/users/login",
      userData
    );
    const token = response.data.token; // Extract the JWT token from the response

    // Decode the JWT token
    const decodedToken = jwt_decode(token);
    const { email, username } = decodedToken;

    // Save the token and username to local storage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    // Dispatch a success action with user data
    dispatch({
      type: "LOGIN_SUCCESS",
      user: {
        email,
        username,
      },
    });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

// Action to add a note
export const addNote = (noteData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // API call to add a note
    const response = await axios.post(
      "https://note-manager-backend.onrender.com/users/addNote",
      noteData,
      config
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Action to get all notes
export const getAllNotes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform an API call to get all notes
    const response = await axios.get(
      "https://note-manager-backend.onrender.com/users/getAllNote",
      config
    );

    // Dispatch the notes to the state
    dispatch({
      type: "GET_ALL_NOTES_SUCCESS",
      notes: response.data.notes,
    });
  } catch (error) {
    // Handle error (e.g., you can dispatch an error action here)
    console.error(error);
  }
};

// Action to delete a note
export const deleteNote = (noteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform an API call to delete a note
    await axios.delete(
      `https://note-manager-backend.onrender.com/users/deleteNote/${noteId}`,
      config
    );

    // After successful deletion, refetch all notes to update the state
    dispatch(getAllNotes());
  } catch (error) {
    // Handle error (e.g., you can display an error message to the user)
    console.error(error);
  }
};

// Action to update a note by ID
export const updateNote = (noteId, updatedNoteData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    if (!token) {
      throw new Error("Token is missing");
    }

    // Set up the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform an API call to update a note
    const response = await axios.put(
      `https://note-manager-backend.onrender.com/updateNote/${noteId}`,
      updatedNoteData,
      config
    );

    if (response.status === 200) {
      dispatch({ type: "UPDATE_NOTE_SUCCESS" });
      return true;
    } else {
      console.error("Update failed");
      return false;
    }
  } catch (error) {
    console.error("An error occurred during the update:", error);
    return false;
  }
};

// Action to log out a user
export const logoutUser = () => (dispatch) => {
  // Clear the token and username from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  dispatch({ type: "LOGOUT" });
};
