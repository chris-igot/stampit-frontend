import { Link, useNavigate } from "react-router-dom";
import React from "react";
interface PropsType {
    children?: React.ReactNode;
}
function Menu(props: PropsType) {
    const navigate = useNavigate();
    return (
        <nav className="navigation">
            <Link className="navigation__link navigation__home" to="/public">
                stckIt
            </Link>
            <Link className="navigation__link" to="/home" reloadDocument>
                home
            </Link>
            <Link className="navigation__link" to="/upload">
                upload
            </Link>
            <Link
                className="navigation__link"
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
