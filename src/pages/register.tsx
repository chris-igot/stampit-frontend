import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/form";
import Input from "../components/form/input";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function Register() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/register", formData, navigate).then((status) => {
            if (status === 200) {
                navigate("/login");
            }
        });
    }
    return (
        <div>
            <Form route="/api/register">
                <Input name="username" />
                <Input name="email" type="email" />
                <Input name="password" type="password" />
                <Input
                    name="passwordConfirm"
                    type="password"
                    label="password confirmation"
                />
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Register
                </button>
            </Form>
        </div>
    );
}
