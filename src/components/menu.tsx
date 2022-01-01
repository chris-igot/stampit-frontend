import { Link } from "react-router-dom";
import React from "react";
interface PropsType {
    children?: React.ReactNode;
}
function Menu(props: PropsType) {
    return (
        <nav>
            <Link to="/fetchtest">fetchtest</Link>
            <Link to="/profile">profile</Link>
            <Link to="/upload">upload</Link>
            {props.children}
        </nav>
    );
}

export default Menu;
