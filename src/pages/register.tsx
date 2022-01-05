import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/form/textInput";
import { OutputType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function Register() {
    const navigate = useNavigate();
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/register", formData).then((output) => {
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
        <div className="page modal">
            <form className="logreg__form" action="" method="post">
                <p className="logo--large" />
                <h4>Register</h4>
                <InputText name="username" />
                <InputText name="email" type="email" />
                <InputText name="password" type="password" />
                <InputText
                    name="passwordConfirm"
                    type="password"
                    label="password confirmation"
                />
                <p>
                    Go back to <Link to={"/login"}>Login</Link> page
                </p>
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}
