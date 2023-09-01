const initialState = {
    addingNote: false, // Flag to indicate if a note is being added
    error: null,
  };
  
  const addNoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_NOTE_REQUEST':
        return {
          ...state,
          addingNote: true,
          error: null,
        };
      case 'ADD_NOTE_SUCCESS':
        return {
          ...state,
          addingNote: false,
          error: null,
        };
      case 'ADD_NOTE_FAILURE':
        return {
          ...state,
          addingNote: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default addNoteReducer;
  