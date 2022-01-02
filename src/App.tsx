import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";
import Menu from "./components/menu";

function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/fetchtest" element={<div></div>}></Route>
                <Route path="/profile" element={<div></div>}></Route>
                <Route path="/upload" element={<div></div>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
