/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import Image from "./image";

import world from "../icons/round_language_white_48dp.png";
import feed from "../icons/round_dynamic_feed_white_48dp.png";
import home from "../icons/round_home_white_48dp.png";
import people from "../icons/round_people_white_48dp.png";
import search from "../icons/round_search_white_48dp.png";
import logout from "../icons/round_logout_white_48dp.png";
interface PropsType {
    children?: React.ReactNode;
}
function Menu(props: PropsType) {
    const navigate = useNavigate();
    const location = useLocation();
    const highlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updateHighlighterDimensions();
    }, []);

    useEffect(() => {
        if (location.pathname.includes("profile")) {
            const hightlight = highlightRef.current as HTMLDivElement;
            hightlight.style.width = "0";
            hightlight.style.height = "0";
            hightlight.style.left = "0";
        } else {
            updateHighlighterDimensions();
        }
    }, [location.pathname]);

    function updateHighlighterDimensions() {
        const menuElem = document.querySelector(
            `a[href='${location.pathname}']`
        ) as HTMLAnchorElement;

        if (menuElem) {
            const hightlight = highlightRef.current as HTMLDivElement;
            hightlight.style.width = menuElem.clientWidth + "px";
            hightlight.style.height = menuElem.clientHeight + "px";
            hightlight.style.left = menuElem.offsetLeft + "px";
        }
    }

    return (
        <nav id="navi" className="navigation">
            <div className="highlighter" ref={highlightRef}></div>
            <NavLink
                className={({ isActive }) => (isActive ? "picked" : " shadow")}
                to="/home"
            >
                <Image className="image--menu z--9002" image={home} />
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "picked" : " shadow")}
                to="/search"
            >
                <Image className="image--menu z--9002" image={search} />
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "picked" : " shadow")}
                to="/feed"
            >
                <Image className="image--menu z--9002" image={feed} />
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "picked" : " shadow")}
                to="/public"
            >
                <Image className="image--menu z--9002" image={world} />
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "picked" : " shadow")}
                to="/following"
            >
                <Image className="image--menu z--9002" image={people} />
            </NavLink>
            <Link
                className="shadow"
                to="/login"
                onClick={() => {
                    fetch("/api/logout").then(() => {
                        navigate("/login");
                    });
                }}
            >
                <Image className="image--menu z--9002" image={logout} />
            </Link>
            {props.children}
        </nav>
    );
}

export default Menu;
