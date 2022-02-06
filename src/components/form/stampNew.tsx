import React from "react";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";

export default function StampNew() {
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/admin/stamps/new", formData, "status").then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    break;
                default:
                    return;
            }
        });
    }
    return (
        <div className="modal">
            <form action="" className="modal-form">
                <input type="file" name="files" id="files" multiple />
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                ></button>
            </form>
        </div>
    );
}
