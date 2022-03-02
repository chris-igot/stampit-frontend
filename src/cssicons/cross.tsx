import React from "react";
import "./icons.scss";

type OnClickFn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
interface PropsType {
    className?: string;
    onClick?: OnClickFn;
}

export default function Cross(props: PropsType) {
    return (
        <div
            className={
                "className" in props
                    ? "css-icon " + props.className
                    : "css-icon"
            }
            onClick={props.onClick || undefined}
        >
            <div className="bar top-5"></div>
            <div className="bar top-5 rotate-90"></div>
        </div>
    );
}
