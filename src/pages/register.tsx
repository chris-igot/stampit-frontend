import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputCheckbox from "../components/form/checkboxInput";
import InputText from "../components/form/textInput";
import convertInputToFormData from "../utilities/convertInputToFormData";
import { postForm } from "../utilities/postForm";
import { escapeRegExp } from "../utilities/regex";

export default function Register() {
    const navigate = useNavigate();

    function handlePwChange(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const pwConfirmElement = document.getElementById(
            "passwordConfirm"
        ) as HTMLInputElement;
        pwConfirmElement.pattern = escapeRegExp(value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);
        let x: { [key: string]: any } = {};

        formData.forEach((val, key) => {
            x[key] = val;
        });

        postForm("/api/register", convertInputToFormData(e), () => {
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
                    <h4>Register</h4>
                    <InputText
                        name="username"
                        pattern="^[ -~]{2,32}$"
                        title="Username must be between 2 and 32 characters"
                        required
                    />
                    <InputText name="email" type="email" required />
                    <InputText
                        name="password"
                        pattern="^[ -~]{8,100}$"
                        title="Password must be between 8 and 100 characters"
                        type="password"
                        onKeyUp={handlePwChange}
                        required
                    />
                    <InputText
                        name="passwordConfirm"
                        type="password"
                        label="password confirmation"
                        title="Password must match"
                        required
                    />
                    <InputCheckbox name={"isPrivate"} label="private?" />

                    <p>
                        Go back to <Link to={"/login"}>Login</Link> page
                    </p>
                    <button className="btn-primary" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
