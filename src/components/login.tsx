import React from "react";
import Form from "./form";

export default function Login() {
    return (
        <Form route="/api/login">
            <div>
                <input type="email" name="email" id="email" />
                <label htmlFor="email">email</label>
            </div>
            <div>
                <input type="password" name="password" id="password" />
                <label htmlFor="password">password</label>
            </div>
            <button type="submit">Login</button>
        </Form>
    );
}
