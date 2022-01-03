import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/form";
import Input from "../components/form/input";
import { OutputType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function Login() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/login", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    navigate("/home");
                    break;
                case 418:
                    //TODO: error here
                    break;
                default:
                    navigate("/login");
                    break;
            }
        });
    }
    return (
        <div className="page">
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
