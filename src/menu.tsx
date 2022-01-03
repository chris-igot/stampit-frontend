import { Link, useNavigate } from "react-router-dom";
import React from "react";
import getData from "./utilities/getData";
interface PropsType {
    children?: React.ReactNode;
}
function Menu(props: PropsType) {
    const navigate = useNavigate();
    return (
        <nav>
            <Link to="/home" reloadDocument>
                home{" "}
            </Link>
            <Link to="/login" reloadDocument>
                login{" "}
            </Link>
            <Link to="/register">register </Link>
            <Link to="/public">public </Link>
            <Link to="/profile">profile</Link>
            <Link to="/upload">upload</Link>
            <Link
                to="/login"
                onClick={() => {
                    fetch("/api/logout");
                }}
            >
                logout
            </Link>
            {props.children}
        </nav>
    );
}

export default Menu;
