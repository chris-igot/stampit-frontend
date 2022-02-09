import React from "react";
import { useNavigate } from "react-router-dom";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";
import InputFile from "./fileInput";
import InputText from "./textInput";

type EnableFnType = (enable: boolean) => void;
interface PropsType {
    onExit?: Function;
    enableFn?: EnableFnType;
}

export default function PostNew(props: PropsType) {
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);
        postForm("/api/posts/new", formData).then((output) => {
            switch (output.status) {
                case 200:
                    (props.enableFn as (enable: boolean) => void)(false);
                    if ("onExit" in props) {
                        (props.onExit as Function)();
                    }
                    break;
                default:
                    navigate("/home");
                    return;
            }
        });
    }
    return (
        <div className="page modal">
            <form
                className="modal__form"
                action=""
                method="post"
                onSubmit={handleSubmit}
            >
                <InputFile name={"file"} />

                <InputText name={"description"} />
                <button className="btn-white" type="submit">
                    Post!
                </button>

                <button
                    className="btn-gray"
                    onClick={(e) => {
                        e.preventDefault();
                        if ("onExit" in props) {
                            (props.onExit as Function)();
                        }
                        if ("enableFn" in props) {
                            (props.enableFn as EnableFnType)(false);
                        }
                    }}
                >
                    cancel
                </button>
            </form>
        </div>
    );
}
