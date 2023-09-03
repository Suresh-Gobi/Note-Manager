import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import addNoteReducer from "./addNoteReducer";
import getNoteReducer from "./getNoteReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  addNote: addNoteReducer,
  getNote: getNoteReducer,
});

export default rootReducer;
