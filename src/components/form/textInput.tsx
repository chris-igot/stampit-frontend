import React, { useEffect, useRef, useState } from "react";

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;
type onKeyUpFunc = (e: React.KeyboardEvent<HTMLInputElement>) => void;
interface PropsType {
    name: string;
    type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
    width?: string;
    className?: string;
    pattern?: string;
    title?: string;
    label?: string;
    value?: string;
    onKeyUp?: onKeyUpFunc;
    onChange?: onChangeFunc;
}
export default function InputText(props: PropsType) {
    const [blank, setBlank] = useState(true);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current?.value === "") {
            setBlank(true);
        } else {
            setBlank(false);
        }

        if ("width" in props) {
            (divRef.current as HTMLDivElement).style.width =
                props.width as string;
            (inputRef.current as HTMLInputElement).style.width =
                props.width as string;
        } else {
            (divRef.current as HTMLDivElement).style.width =
                (inputRef.current as HTMLInputElement).clientWidth + "px";
        }
        (divRef.current as HTMLDivElement).style.height =
            (inputRef.current as HTMLInputElement).clientHeight + "px";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const str = e.currentTarget.value;

        setBlank(str === "");

        if ("onKeyUp" in props) {
            (props.onKeyUp as onKeyUpFunc)(e);
        }
    }

    return (
        <div
            className={
                blank ? "form__input--text" : "form__input--text notblank"
            }
            ref={divRef}
        >
            <input
                id={props.name}
                className={
                    "rounded--15 outline--gray interactive" +
                    ("className" in props ? " " + props.className : "")
                }
                ref={inputRef}
                type={"type" in props ? props.type : "text"}
                name={props.name}
                pattern={"pattern" in props ? props.pattern : ".?"}
                title={"title" in props ? props.title : ""}
                defaultValue={"value" in props ? props.value : ""}
                onKeyUp={handleKeyPress}
            />
            <label htmlFor={props.name}>
                {"label" in props ? props.label : props.name}
            </label>
        </div>
    );
}
