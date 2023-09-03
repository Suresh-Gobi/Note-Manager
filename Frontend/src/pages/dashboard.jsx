import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getAllNotes, addNote } from "../actions/userActions"; 
import "../assets/styles/main.css";
import { Modal, Button, Form } from "react-bootstrap";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const notes = useSelector((state) => state.getNote.notes); 
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubject, setNoteSubject] = useState("");
  const [note, setNote] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddNote = async () => {
    try {
      const addedNote = await dispatch(addNote({ noteTitle, noteSubject, note }));
      setSuccessMessage("Note Added Successfully");

      dispatch({
        type: "ADD_NOTE_SUCCESS", 
        note: addedNote, 
      });

      
      setNoteTitle("");
      setNoteSubject("");
      setNote("");
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllNotes());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Note-Manager</h2>
        <hr />
        <h5>Welcome, {username}!</h5>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <h2>Dashboard</h2>
        <hr />
        <button className="button-40" onClick={() => setShowModal(true)}>
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span> New Note</span>
        </button>

        {successMessage && <p>{successMessage}</p>}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Note Title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Note Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Note Subject"
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddNote}>
              Add Note
            </Button>
          </Modal.Footer>
        </Modal>

        {notes.length > 0 && (
          <div>
            <h3>Your Notes:</h3>
            <div className="notes">
              {notes.map((note) => (
                <div key={note.id} className="card note-card">
                  <p>
                    <strong>Title: </strong> {note.noteTitle}
                    <br />
                  </p>
                  
                  <div className="note-buttons">
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
