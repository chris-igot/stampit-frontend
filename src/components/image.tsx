import React from "react";

interface PropsType {
    image: string;
    class?: string;
    [key: string]: string | undefined;
}

export default function Image(props: PropsType) {
    return (
        <div className={"class" in props ? props.class : ""}>
            <img src={props.image} alt="" />
        </div>
    );
}
