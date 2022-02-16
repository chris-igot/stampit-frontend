import React, { useEffect, useRef, useState } from "react";

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;
interface PropsType {
    name: string;
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
    label?: string;
    checked?: boolean;
    onChange?: onChangeFunc;
}
export default function InputCheckbox(props: PropsType) {
    const [checked, setChecked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current?.checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setChecked(e.currentTarget.checked);
        if ("onChange" in props) {
            (props.onChange as onChangeFunc)(e);
        }
    }

    return (
        <div className={"form__input-checkbox"}>
            <span>{"label" in props ? props.label : props.name}</span>
            <input
                id={props.name}
                ref={inputRef}
                type={"checkbox"}
                name={props.name}
                defaultChecked={"checked" in props ? props.checked : false}
                onChange={handleChange}
            />
            <label
                className={checked ? "checkbox checked" : "checkbox"}
                htmlFor={props.name}
            ></label>
        </div>
    );
}
