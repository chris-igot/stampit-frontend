import React, { useEffect, useState } from "react";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";

export default function StampNew() {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    function updateImagePreviews(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.currentTarget.files as FileList;
        let previews: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const preview = URL.createObjectURL(files[i]);
            previews.push(preview);
        }

        setImagePreviews(previews);
    }
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
            <form action="" className="modal__form">
                <input
                    type="file"
                    name="files"
                    id="files"
                    multiple
                    onChange={updateImagePreviews}
                />
                {imagePreviews.map((preview, index) => (
                    <div key={index}>
                        <Image
                            className={"image--stamp-small"}
                            image={preview}
                        />
                    </div>
                ))}
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
