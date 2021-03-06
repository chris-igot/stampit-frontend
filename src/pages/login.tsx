import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/form/textInput";
import convertInputToFormData from "../utilities/convertInputToFormData";
import { postForm } from "../utilities/postForm";

export default function Login() {
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        postForm("/api/login", convertInputToFormData(e), () => {
            navigate("/home");
        });
    }
    return (
        <div className="page modal">
            <div className="modal__form">
                <form
                    className=""
                    action=""
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <p className="logo--large" />
                    <h4>Login</h4>
                    <InputText name="email" type="email" required />
                    <InputText name="password" type="password" required />
                    <p>
                        New user?
                        <br />{" "}
                        <Link to={"/register"}>Create a new account</Link>
                    </p>
                    <button className="btn-primary" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
