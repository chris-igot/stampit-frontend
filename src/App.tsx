import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./styles/App.scss";
import Menu from "./menu";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import PostNew from "./pages/postNew";
import Public from "./pages/public";

function App() {
    useEffect(() => {
        console.log((process.env as any).REACT_APP_SERVER_PATH);
    }, []);
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/home" element={<Profile home={true} />} />
                <Route path="/profile" element={<Profile home={false} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/public" element={<Public />} />
                <Route path="/profile" element={<div></div>} />
                <Route path="/upload" element={<PostNew />} />
            </Routes>
        </Router>
    );
}

export default App;
