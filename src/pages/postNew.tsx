import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/form";
import Input from "../components/form/input";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function PostNew() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/post/new", formData, navigate).then((status) => {
            if (status === 200) {
                navigate("/home");
            }
        });
    }
    return (
        <div>
            <Form route="/api/login">
                <Input name="file" type="file" />
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Post!
                </button>
            </Form>
        </div>
    );
}
