import React, { useEffect, useState } from "react";
import "./icons.scss";

type OnClickFn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

interface PropsType {
    direction?: "up" | "down";
    onClick?: OnClickFn;
}

export default function Arrow(props: PropsType) {
    const [bar1, setBar1] = useState("short-bar top-5 rotate--45");
    const [bar2, setBar2] = useState("short-bar top-5 left-5 rotate-45");

    useEffect(() => {
        if (props.direction) {
            switch (props.direction) {
                case "up":
                    setBar1("short-bar top-5 rotate--45");
                    setBar2("short-bar top-5 left-5 rotate-45");
                    break;
                case "down":
                    setBar1("short-bar top-5 rotate-45");
                    setBar2("short-bar top-5 left-5 rotate--45");
                    break;
            }
        }
    }, [props.direction]);

    return (
        <div className={"css-icon"} onClick={props.onClick || undefined}>
            <div className={bar1}></div>
            <div className={bar2}></div>
        </div>
    );
}
