// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/header";
import Signup from "./pages/signup"
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
