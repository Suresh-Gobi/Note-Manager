const initialState = {
  notes: [],
};

const getNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_NOTES_SUCCESS":
      return {
        ...state,
        notes: action.notes,
      };

    default:
      return state;
  }
};

export default getNoteReducer;
