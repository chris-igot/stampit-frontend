import React from "react";

interface PropsType {
    children?: React.ReactNode;
    errors?: string[];
    route: string;
}

export default function Form(props: PropsType) {
    return (
        <form action={props.route} method="POST" className="form">
            {"errors" in props
                ? props.errors?.map((error) => <p>{error}</p>)
                : ""}
            {props.children}
        </form>
    );
}
