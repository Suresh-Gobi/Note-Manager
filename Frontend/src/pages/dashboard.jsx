import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getAllNotes, addNote, deleteNote, updateNote } from "../actions/userActions";
import "../assets/styles/main.css";
import { Modal, Button, Form } from "react-bootstrap";
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

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
  const [showModal, setShowModal] = useState(false); // State for the add note modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for the delete confirmation modal
  const [showNoteDetailsModal, setShowNoteDetailsModal] = useState(false); // State for the note details modal
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteDetails, setNoteDetails] = useState({
    noteTitle: "",
    noteSubject: "",
    note: "",
    editable: false, // Add editable property
  });

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddNote = async () => {
    try {
      const addedNote = await dispatch(addNote({ noteTitle, noteSubject, note }));
      setSuccessMessage("Note Added Successfully");

      setNoteTitle("");
      setNoteSubject("");
      setNote("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      if (noteToDelete) {
        await dispatch(deleteNote(noteToDelete._id));
        setNoteToDelete(null); // Clear the note to delete
        setShowDeleteModal(false); // Close the delete confirmation modal
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showDeleteConfirmation = (note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const showNoteDetails = (note) => {
    setNoteDetails({
      noteTitle: note.noteTitle,
      noteSubject: note.noteSubject,
      note: note.note,
      editable: false, // Initialize as view mode
    });
    setShowNoteDetailsModal(true);
  };

  const handleUpdateNote = async () => {
    try {
      if (noteToDelete) {
        const updatedNoteData = {
          noteTitle: noteDetails.noteTitle,
          noteSubject: noteDetails.noteSubject,
          note: noteDetails.note,
        };
  
        // Dispatch the updateNote action with the updated note details
        const success = await dispatch(updateNote(noteToDelete._id, updatedNoteData));
  
        if (success) {
          // Close the modal and clear the editable flag
          setShowNoteDetailsModal(false);
          setNoteDetails({ ...noteDetails, editable: false });
  
          // Optionally, you can fetch all notes again to update the list
          dispatch(getAllNotes());
        } else {
          // Handle update failure (show an error message, if needed)
          console.error("Update failed");
        }
      }
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
          <i className="fa fa-plus" aria-hidden="true"></i>
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
                <div key={note._id} className="card note-card">
                  <p>
                    <strong>Title: </strong> {note.noteTitle}
                    <br />
                  </p>

                  <div className="note-buttons">
                    <button className="btn btn-primary" onClick={() => showNoteDetails(note)}>View</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => showDeleteConfirmation(note)} // Show delete confirmation modal
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this note?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteNote}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Note Details Modal */}
        <Modal show={showNoteDetailsModal} onHide={() => setShowNoteDetailsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Note Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={noteDetails.noteTitle}
                readOnly={!noteDetails.editable}
                onChange={(e) => setNoteDetails({ ...noteDetails, noteTitle: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={noteDetails.noteSubject}
                readOnly={!noteDetails.editable}
                onChange={(e) => setNoteDetails({ ...noteDetails, noteSubject: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={noteDetails.note}
                readOnly={!noteDetails.editable}
                onChange={(e) => setNoteDetails({ ...noteDetails, note: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {noteDetails.editable ? (
              <>
                <Button variant="primary" onClick={handleUpdateNote}>
                  Update
                </Button>
                <Button variant="secondary" onClick={() => setShowNoteDetailsModal(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setNoteDetails({ ...noteDetails, editable: true })}>
                Edit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
