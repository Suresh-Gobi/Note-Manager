const initialState = {
  updatingNote: false, // Flag to indicate if a note is being updated
  error: null,
};

const updateNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NOTE_REQUEST":
      return {
        ...state,
        updatingNote: true,
        error: null,
      };
    case "UPDATE_NOTE_SUCCESS":
      return {
        ...state,
        updatingNote: false,
        error: null,
      };
    case "UPDATE_NOTE_FAILURE":
      return {
        ...state,
        updatingNote: false,
        error: "Note update failed",
      };
    default:
      return state;
  }
};

export default updateNoteReducer;
