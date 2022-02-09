import React from "react";
import Menu from "../components/menu";
import Following from "../pages/following";
import Login from "../pages/login";
import Post from "../pages/post";
import Profile from "../pages/profile";
import Public from "../pages/public";
import Register from "../pages/register";
import Search from "../pages/search";

let routeConfig = {
    root: {
        path: "/",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Profile home={true} />
            </React.Fragment>
        ),
    },
    home: {
        path: "/home",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Profile home={true} />
            </React.Fragment>
        ),
    },
    profile: {
        path: "/profile",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Profile home={false} />
            </React.Fragment>
        ),
    },
    search: {
        path: "/search",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Search />
            </React.Fragment>
        ),
    },
    following: {
        path: "/following",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Following />
            </React.Fragment>
        ),
    },
    post: {
        path: "/post",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Post />
            </React.Fragment>
        ),
    },
    login: {
        path: "/login",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Login />
            </React.Fragment>
        ),
    },
    register: {
        path: "/register",
        restrictTo: ["user"],
        _element: (
            <React.Fragment>
                <Menu />
                <Register />
            </React.Fragment>
        ),
        get element() {
            return this._element;
        },
        set element(value) {
            this._element = value;
        },
    },
    public: {
        path: "/public",
        restrictTo: ["user"],
        element: (
            <React.Fragment>
                <Menu />
                <Public />
            </React.Fragment>
        ),
    },
};

export default routeConfig;
