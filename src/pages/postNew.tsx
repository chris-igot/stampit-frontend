import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/input";
import { OutputType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function PostNew() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/post/new", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    navigate("/home");
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
    }
    return (
        <div className="page">
            <form action="" method="post">
                <Input name="file" type="file" />
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Post!
                </button>
            </form>
        </div>
    );
}
