import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/form";
import Input from "../components/form/input";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function Login() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/login", formData, navigate).then((status) => {
            if (status === 200) {
                navigate("/home");
            }
        });
    }
    return (
        <div>
            <Form route="/api/login">
                <Input name="email" type="email" />
                <Input name="password" type="password" />
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Login
                </button>
            </Form>
        </div>
    );
}
