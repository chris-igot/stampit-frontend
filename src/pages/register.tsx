import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/form/textInput";
import { OutputType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import postForm from "../utilities/postForm";

export default function Register() {
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);
        let x: { [key: string]: any } = {};
        formData.forEach((val, key) => {
            x[key] = val;
        });
        // fetch("/api/register", {
        //     method: "POST",
        //     body: JSON.stringify(x),
        //     headers: { "Content-Type": "application/json" },
        // })
        //     .then((output) => {
        //         console.log("REGISTRATION OUTPUT", output);
        //         return output.json();
        //     })
        //     .then((output) => {
        //         console.log("REGISTRATION OUTPUT2", output);
        //     });
        postForm("/api/register", formData).then((output) => {
            console.log("REGISTRATION OUTPUT", output);
            switch (output.status) {
                case 200:
                    // navigate("/home");
                    break;
                case 418:
                    //TODO: error here
                    break;
                default:
                    // navigate("/login");
                    break;
            }
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
                    <button className="btn-white" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
