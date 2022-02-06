import React from "react";

type onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface PropsType {
    name: string;
    multiple?: boolean;
    onChange?: onChangeFunc;
}

export default function FileInput(props: PropsType) {
    return (
        <div className="form__input-file">
            {props.multiple === true ? (
                <input
                    type="file"
                    name={props.name}
                    id={props.name}
                    multiple
                    onChange={(e) => {
                        if ("onChange" in props) {
                            (props.onChange as onChangeFunc)(e);
                        }
                    }}
                />
            ) : (
                <input
                    type="file"
                    name={props.name}
                    id={props.name}
                    onChange={(e) => {
                        if ("onChange" in props) {
                            (props.onChange as onChangeFunc)(e);
                        }
                    }}
                />
            )}
        </div>
    );
}
