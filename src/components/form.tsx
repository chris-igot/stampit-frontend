import React from "react";

interface PropsType {
    children?: React.ReactNode;
    route: string;
}

export default function Form(props: PropsType) {
    return (
        <form action={props.route} method="POST" className="form">
            {props.children}
        </form>
    );
}
