import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../components/form/textInput";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import { postForm } from "../../utilities/postForm";

export default function AdminLogin() {
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);

        postForm("/api/admin/login", formData, () => {
            navigate("/admin/home");
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
                    <h4>Admin Login</h4>
                    <InputText name="email" type="email" />
                    <InputText name="password" type="password" />
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
