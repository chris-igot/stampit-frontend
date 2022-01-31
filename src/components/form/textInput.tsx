import React, { useEffect, useState } from "react";
interface PropsType {
    name: string;
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
    label?: string;
}
export default function InputText(props: PropsType) {
    const [blank, setBlank] = useState(true);
    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const str = e.currentTarget.value;
        console.log(str);
        setBlank(str === "");
        if (str === "") {
            console.log("blank");
        } else {
            console.log("not blank");
        }
    }
    useEffect(() => {
        console.log("input loaded", { ...props });
    }, []);
    return (
        <div
            className={blank ? "form__input-text" : "form__input-text notblank"}
        >
            <input
                type={"type" in props ? props.type : "text"}
                name={props.name}
                id={props.name}
                onKeyUp={(e) => {
                    handleKeyPress(e);
                }}
            />
            <label htmlFor={props.name}>
                {"label" in props ? props.label : props.name}
            </label>
        </div>
    );
}
