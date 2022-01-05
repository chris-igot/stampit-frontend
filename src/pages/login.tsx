import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/form/textInput";
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
                    break;
            }
        });
    }
    return (
        <div className="page modal">
            <form className="logreg__form" action="" method="post">
                <p className="logo--large" />
                <h4>Login</h4>
                <InputText name="email" type="email" />
                <InputText name="password" type="password" />
                <p>
                    New user? <Link to={"/register"}>Create a new account</Link>
                </p>
                <button
                    type="submit"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
