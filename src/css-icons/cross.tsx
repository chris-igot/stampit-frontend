import React from "react";
import "./icons";

interface PropsType {
    className?: string;
}

export default function Cross(props: PropsType) {
    return (
        <div
            className={
                "className" in props
                    ? "css-icons" + props.className
                    : "css-icons"
            }
        >
            <div className="bar top-5"></div>
            <div className="bar top-5 rotate-90"></div>
        </div>
    );
}
