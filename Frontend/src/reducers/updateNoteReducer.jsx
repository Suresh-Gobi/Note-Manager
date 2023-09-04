const initialState = {
    // Your initial state properties
    // ...
  };
  
  const updateNoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_NOTE_SUCCESS":
        // Map through the notes and update the one with a matching ID
        const updatedNotes = state.notes.map((note) => {
          if (note._id === action.updatedNote._id) {
            // Update the note's properties
            return {
              ...note,
              noteTitle: action.updatedNote.noteTitle,
              noteSubject: action.updatedNote.noteSubject,
              note: action.updatedNote.note,
            };
          }
          return note; // For other notes, return them as they are
        });
  
        return {
          ...state,
          notes: updatedNotes,
        };
  
      default:
        return state;
    }
  };
  
  export default updateNoteReducer;
  