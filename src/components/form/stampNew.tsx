import React, { useEffect, useState } from "react";
import { OutputType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";
import Image from "../image";
import InputFile from "./fileInput";

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
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);
        console.log("formdata", formData);
        postForm<Object>(
            "/api/admin/stamps/multiplenew",
            formData,
            "status"
        ).then((output) => {
            switch (output.status) {
                case 200:
                    break;
                default:
                    return;
            }
        });
    }

    function resetFiles() {
        (document.getElementById("files") as HTMLInputElement).value = "";
        setImagePreviews([]);
    }
    return (
        <div className="page">
            <form
                action=""
                className="form-newstamps bg-c-white rounded p-2"
                onSubmit={handleSubmit}
            >
                <h3 className="mt-0">Add New Stamps</h3>
                <InputFile
                    className="btn-white mb-2"
                    name={"files"}
                    multiple={true}
                    onChange={updateImagePreviews}
                />
                <div className="image-previews my-2 bg-c-gray rounded">
                    {imagePreviews.map((preview, index) => (
                        <div className="" key={index}>
                            <Image
                                className={"image--stamp-small"}
                                image={preview}
                            />
                        </div>
                    ))}
                </div>
                <button className="btn-white mt-2" type="submit">
                    Submit
                </button>
                <button
                    className="btn-gray ml-2"
                    onClick={(e) => {
                        e.preventDefault();
                        resetFiles();
                    }}
                >
                    Reset
                </button>
            </form>
        </div>
    );
}
