// updateNoteReducer.js
const initialState = {
  updatingNote: false,
  updateError: null, // Change to updateError
};

const updateNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NOTE_REQUEST":
      return {
        ...state,
        updatingNote: true,
        updateError: null,
      };
    case "UPDATE_NOTE_SUCCESS":
      return {
        ...state,
        updatingNote: false,
        updateError: null,
      };
    case "UPDATE_NOTE_FAILURE":
      return {
        ...state,
        updatingNote: false,
        updateError: "Note update failed", // Update error message
      };
    default:
      return state;
  }
};

export default updateNoteReducer;
