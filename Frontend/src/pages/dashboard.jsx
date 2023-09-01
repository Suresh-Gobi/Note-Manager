import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { addNote } from "../actions/userActions"; // Import the addNote action

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubject, setNoteSubject] = useState("");
  const [note, setNote] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddNote = async () => {
    // Dispatch the addNote action with the note data
    try {
      await dispatch(addNote({ noteTitle, noteSubject, note }));
      // If the note was added successfully, show the success message
      setSuccessMessage("Note Added Successfully");
    } catch (error) {
      // Handle error (e.g., display an error message to the user)
      console.error(error);
      // You can dispatch an action here if needed
      // dispatch({ type: "ADD_NOTE_FAILURE", error });
    }
  };

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // You can use a router library like react-router for this
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {username || "Guest"}!</p>
      <p>Email: {email || "N/A"}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Add Note Form */}
      <h3>Add a Note</h3>
      <input
        type="text"
        placeholder="Note Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Note Subject"
        value={noteSubject}
        onChange={(e) => setNoteSubject(e.target.value)}
      />
      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>

      {/* Display success message */}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Dashboard;
