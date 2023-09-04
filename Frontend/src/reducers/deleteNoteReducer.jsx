const initialState = {
    // Your initial state properties
    // ...
  };
  
  const deleteNoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "DELETE_NOTE_SUCCESS":
        // Filter out the deleted note from the state
        const updatedNotes = state.notes.filter(
          (note) => note._id !== action.noteId
        );
  
        return {
          ...state,
          notes: updatedNotes,
        };
  
      default:
        return state;
    }
  };
  
  export default deleteNoteReducer;  