// reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import addNoteReducer from "./addNoteReducer";
import getNoteReducer from "./getNoteReducer";
import deleteNoteReducer from "./deleteNoteReducer";
import updateNoteReducer from "./updateNoteReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  addNote: addNoteReducer,
  getNote: getNoteReducer,
  deleteNote: deleteNoteReducer,
  updateNote: updateNoteReducer,
});

export default rootReducer;
