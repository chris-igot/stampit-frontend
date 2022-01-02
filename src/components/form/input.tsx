import React from "react";
interface PropsType {
    name: string;
    type?: string;
    label?: string;
}
export default function Input(props: PropsType) {
    return (
        <div className="form-input-text">
            <input
                type={"type" in props ? props.type : "text"}
                name={props.name}
                id={props.name}
            />
            <label htmlFor={props.name}>
                {"label" in props ? props.label : props.name}
            </label>
            input
        </div>
    );
}
