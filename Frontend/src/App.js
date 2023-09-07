import "./App.css";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { Provider } from "react-redux"; // Import Redux Provider to connect Redux store to the React app
import { createStore, applyMiddleware } from "redux"; // Import functions for creating the Redux store and applying middleware
import thunk from "redux-thunk"; // Import Redux Thunk middleware for handling async actions
import rootReducer from "./reducers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Redux store with the root reducer and apply the Redux Thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    // Redux Provider to provide access to the store
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
