import React from "react";

interface PropsType {
    image: string;
}

export default function ImageSquare(props: PropsType) {
    return (
        <div className="imagesquare">
            <img src={props.image} alt="" />
        </div>
    );
}
