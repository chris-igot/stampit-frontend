import React from "react";
import { useNavigate } from "react-router-dom";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";

interface PropsType {
    enableFn?: (enable: boolean) => void;
}

export default function PostNew(props: PropsType) {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/post/new", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    (props.enableFn as (enable: boolean) => void)(false);
                    break;
                default:
                    navigate("/home");
                    return;
            }
        });
    }
    return (
        <div className="page modal">
            <form className="modal__form" action="" method="post">
                <input type="file" name="file" id="file" />
                <input type="text" name="description" id="description" />
                <button
                    type="submit"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Post!
                </button>

                <button
                    className="btn-gray"
                    onClick={(e) => {
                        e.preventDefault();
                        (props.enableFn as (enable: boolean) => void)(false);
                    }}
                >
                    cancel
                </button>
            </form>
        </div>
    );
}
