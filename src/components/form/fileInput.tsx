import React from "react";

interface PropsType {
    name: string;
    multiple?: boolean;
}

export default function FileInput(props: PropsType) {
    return (
        <div className="form__input-file">
            {props.multiple === true ? (
                <input type="file" name={props.name} id={props.name} multiple />
            ) : (
                <input type="file" name={props.name} id={props.name} />
            )}
        </div>
    );
}
