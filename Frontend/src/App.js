import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
  );
}

export default App;
