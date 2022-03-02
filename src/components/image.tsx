import React, { MouseEventHandler } from "react";

interface PropsType {
    image: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    [key: string]: MouseEventHandler<HTMLDivElement> | string | undefined;
}

export default function Image(props: PropsType) {
    return (
        <div
            className={props.className || ""}
            onClick={props.onClick as MouseEventHandler<HTMLDivElement>}
        >
            <img src={props.image} alt="" />
        </div>
    );
}
