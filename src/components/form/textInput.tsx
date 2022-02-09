import React, { useEffect, useRef, useState } from "react";

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;
interface PropsType {
    name: string;
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
    label?: string;
    value?: string;
    onChange?: onChangeFunc;
}
export default function InputText(props: PropsType) {
    const [blank, setBlank] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current?.value === "") {
            setBlank(true);
        } else {
            setBlank(false);
        }
    }, []);

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const str = e.currentTarget.value;

        setBlank(str === "");
    }

    return (
        <div
            className={blank ? "form__input-text" : "form__input-text notblank"}
        >
            <input
                id={props.name}
                ref={inputRef}
                type={"type" in props ? props.type : "text"}
                name={props.name}
                defaultValue={"value" in props ? props.value : ""}
                onKeyUp={handleKeyPress}
            />
            <label htmlFor={props.name}>
                {"label" in props ? props.label : props.name}
            </label>
        </div>
    );
}
