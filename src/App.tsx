import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Public from "./pages/public";
import Post from "./pages/post";
import Following from "./pages/following";
import Search from "./pages/search";
import AdminLogin from "./pages/admin/adminLogin";
import AdminHome from "./pages/admin/adminHome";

function App() {
    // const loc = useLocation();

    useEffect(() => {
        // console.log(
        //     matchRoutes([{ path: "/login" }, { path: "/register" }], loc)
        // );
    }, []);
    return (
        <Router>
            {/* <Menu /> */}
            <Routes>
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/" element={<Profile home={true} />} />
                <Route
                    path="/home"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Profile home={true} />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/profiles"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Profile home={false} />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Search />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/following"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Following />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/posts"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Post />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <React.Fragment>
                            {/* <Menu /> */}
                            <Login />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <React.Fragment>
                            {/* <Menu /> */}
                            <Register />
                        </React.Fragment>
                    }
                />
                <Route
                    path="/public"
                    element={
                        <React.Fragment>
                            <Menu />
                            <Public />
                        </React.Fragment>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
