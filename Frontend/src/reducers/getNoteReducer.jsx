// Add this case to userReducer.js
case 'GET_ALL_NOTES_SUCCESS':
  return {
    ...state,
    error: null,
    user: {
      ...state.user,
      notes: action.notes,
    },
  };
