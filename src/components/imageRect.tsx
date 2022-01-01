import React from "react";

interface PropsType {
    image: string;
}

export default function ImageRect(props: PropsType) {
    return (
        <div className="imagerect">
            <img src={props.image} alt="" />
        </div>
    );
}
