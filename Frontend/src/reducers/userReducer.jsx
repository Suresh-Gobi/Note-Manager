const initialState = {
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          error: null
        };
      case 'SIGNUP_ERROR':
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  