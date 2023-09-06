import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} from "../actions/userActions";
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
  const [showModal, setShowModal] = useState(false); // State for the add note modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for the delete confirmation modal
  const [showNoteDetailsModal, setShowNoteDetailsModal] = useState(false); // State for the note details modal
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteDetails, setNoteDetails] = useState({
    noteTitle: "",
    noteSubject: "",
    note: "",
    editable: false,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Define isEditing state
  const [editableNote, setEditableNote] = useState(null); // Define editableNote state
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(""); // Define updateSuccessMessage state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const [notesPerPage] = useState(3); // Number of notes to display per page
  const [currentPage, setCurrentPage] = useState(1);



  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    // Calculate the range of notes to display
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Function to update isMobileView based on screen width
  const updateIsMobileView = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddNote = async () => {
    try {
      const addedNote = await dispatch(
        addNote({ noteTitle, noteSubject, note })
      );
      setSuccessMessage("Note Added Successfully");
      setIsSuccessMessageVisible(true);

      setNoteTitle("");
      setNoteSubject("");
      setNote("");

      setShowModal(false);

      dispatch(getAllNotes());

      // Set a timer to hide the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setIsSuccessMessageVisible(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      if (noteToDelete) {
        await dispatch(deleteNote(noteToDelete._id));
        setNoteToDelete(null);
        setShowDeleteModal(false);
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

  const handleEditNote = (note) => {
    setEditableNote(note);
    setIsEditing(true);

    // Open the update modal
    setIsUpdateModalOpen(true);
  };

  const handleUpdateNote = async () => {
    try {
      if (editableNote) {
        const updatedNoteData = {
          noteTitle: editableNote.noteTitle,
          noteSubject: editableNote.noteSubject,
          note: editableNote.note,
        };

        const success = await dispatch(
          updateNote(editableNote._id, updatedNoteData)
        );

        if (success) {
          setIsEditing(false);
          setEditableNote(null);

          dispatch(getAllNotes());

          setUpdateSuccessMessage("Note Updated Successfully");

          setIsUpdateModalOpen(false);

          setTimeout(() => {
            setUpdateSuccessMessage("");
          }, 2000);
        } else {
          console.error(
            "Update failed. Please check your server or API response."
          );
        }
      }
    } catch (error) {
      console.error("An error occurred during the update:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateIsMobileView);
    if (isAuthenticated) {
      dispatch(getAllNotes());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {isMobileView && (
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? "show-sidebar" : ""}`}>
        <button className="close-button" onClick={toggleSidebar}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        {/* Sidebar content */}
        <div className="sidebar-content">
          <h2>Note-Manager</h2>
          <hr />
          <h5>Welcome, {username}!</h5>
          <div className="logout-button-container">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* ... */}
      </div>

      {/* <div className="sidebar">
        
      </div> */}

      <div className="main-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>

          <button
            className="button-40"
            style={{ marginLeft: "auto" }}
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            <span> New Note</span>
          </button>
        </div>
        <hr />

        {isSuccessMessageVisible && (
          <div className="success-message">
            <p className="success-text">{successMessage}</p>
          </div>
        )}

        {updateSuccessMessage && (
          <div className="update-success-message">{updateSuccessMessage}</div>
        )}

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

        {currentNotes.map((note) => (
            <div key={note._id} className="card note-card note-card-margin">
              <p>
                <strong>Title: </strong> {note.noteTitle}
                <br />
              </p>

              <div className="note-buttons" style={{ marginLeft: "auto" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => showNoteDetails(note)}
                  style={{ margin: "0 5px" }}
                >
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => showDeleteConfirmation(note)}
                  style={{ margin: "0 5px" }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => handleEditNote(note)}
                  style={{ margin: "0 5px" }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteNote}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Note Details Modal */}
        <Modal
          show={showNoteDetailsModal}
          onHide={() => setShowNoteDetailsModal(false)}
        >
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
                onChange={(e) =>
                  setNoteDetails({ ...noteDetails, noteTitle: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={noteDetails.noteSubject}
                readOnly={!noteDetails.editable}
                onChange={(e) =>
                  setNoteDetails({
                    ...noteDetails,
                    noteSubject: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={noteDetails.note}
                readOnly={!noteDetails.editable}
                onChange={(e) =>
                  setNoteDetails({ ...noteDetails, note: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
        </Modal>

        {/* Edit Note Modal */}
        <Modal
          show={isUpdateModalOpen}
          onHide={() => setIsUpdateModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editableNote?.noteTitle || ""}
                  onChange={(e) =>
                    setEditableNote({
                      ...editableNote,
                      noteTitle: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Note Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={editableNote?.noteSubject || ""}
                  onChange={(e) =>
                    setEditableNote({
                      ...editableNote,
                      noteSubject: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editableNote?.note || ""}
                  onChange={(e) =>
                    setEditableNote({
                      ...editableNote,
                      note: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateNote}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: Math.ceil(notes.length / notesPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(notes.length / notesPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
