import React from "react";
import Form from "./form";

export default function Registration() {
    return (
        <Form route="/api/register">
            <div>
                <input type="text" name="name" id="name" />
                <label htmlFor="name">username</label>
            </div>
            <div>
                <input type="email" name="email" id="email" />
                <label htmlFor="email">email</label>
            </div>
            <div>
                <input type="password" name="password" id="password" />
                <label htmlFor="password">password</label>
            </div>
            <div>
                <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                />
                <label htmlFor="passwordConfirm">passwordConfirm</label>
            </div>
            <button type="submit">Register</button>
        </Form>
    );
}
