

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginForm.js";
import Register from "./components/RegisterForm.js";
import Dashboard from "./components/Dashboard.js";
import Notes from './components/NotesPage.js';
import Links from "./components/LinksPage.js";
import Passwords from "./components/PasswordsPage.js";
import "./styles/App.css";
import './components/Navbar.js';
import Navbar1 from "./components/Navbar1.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";

function App() {
  return (
    <Router>
      <Navbar1/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/links" element={<Links />} />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;