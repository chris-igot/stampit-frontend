import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/fetchtest">fetchtest</Link>
                <Link to="/profile">profile</Link>
                <Link to="/upload">upload</Link>
            </nav>
            <Routes>
                <Route path="/fetchtest" element={<div></div>}></Route>
                <Route path="/profile" element={<div></div>}></Route>
                <Route path="/upload" element={<div></div>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
