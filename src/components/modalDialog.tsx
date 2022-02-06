import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";

interface PropsType {
    message: string;
    children?: React.ReactNode;
    display: boolean;
    setDisplay: (displayState: boolean) => void;
}

export default function Dialog(props: PropsType) {
    return (
        <React.Fragment>
            {props.display && (
                <div className="modal">
                    <div className="modal__dialog">
                        <p>{props.message}</p>
                        {props.children}
                        <button
                            className="btn-white"
                            onClick={() => {
                                props.setDisplay(false);
                            }}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
