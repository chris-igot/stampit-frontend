import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./menu";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Profile from "./pages/user/profile";
import Public from "./pages/user/public";
import Post from "./pages/user/post";
import Following from "./pages/user/following";
import Search from "./pages/user/search";

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
                    path="/profile"
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
                    path="/post"
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
