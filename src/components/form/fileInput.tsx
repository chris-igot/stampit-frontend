import React, { useEffect, useRef, useState } from "react";

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface PropsType {
    name: string;
    className?: string;
    label?: React.ReactNode;
    multiple?: boolean;
    listFiles?: boolean;
    onChange?: onChangeFunc;
}

export default function InputFile(props: PropsType) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let addedFileNames: string[] = [];
        const files = (inputRef.current as HTMLInputElement).files as FileList;

        for (let i = 0; i < files.length; i++) {
            addedFileNames.push(files[i].name);
        }

        if ("onChange" in props) {
            (props.onChange as onChangeFunc)(e);
        }

        setFileNames(addedFileNames);
    }

    return (
        <div className="form__input--file">
            {props.multiple === true ? (
                <input
                    type="file"
                    ref={inputRef}
                    name={props.name}
                    id={props.name}
                    multiple
                    onChange={handleChange}
                />
            ) : (
                <input
                    type="file"
                    ref={inputRef}
                    name={props.name}
                    id={props.name}
                    onChange={handleChange}
                />
            )}
            <label
                className={"className" in props ? props.className : ""}
                htmlFor={props.name}
            >
                {"label" in props
                    ? props.label
                    : "Choose " + (props.multiple ? "files" : "file")}
            </label>
            {props.listFiles ? (
                <div>
                    {fileNames.map((fileName) => (
                        <p key={fileName}>{fileName}</p>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
