import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    matchRoutes,
    useLocation,
    Location,
    useRoutes,
    RouteObject,
} from "react-router-dom";
import logo from "./logo.svg";
import "./styles/App.scss";
import Menu from "./menu";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import PostNew from "./pages/postNew";
import Public from "./pages/public";
import Post from "./pages/post";

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
                <Route
                    path="/upload"
                    element={
                        <React.Fragment>
                            <Menu />
                            <PostNew />
                        </React.Fragment>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
