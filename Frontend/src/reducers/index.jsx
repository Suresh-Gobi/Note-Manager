import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import addNoteReducer from './addNoteReducer'; // Import the addNoteReducer

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  addNote: addNoteReducer, // Add the addNoteReducer here
});

export default rootReducer;
