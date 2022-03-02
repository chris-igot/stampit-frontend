import React, { useContext, useState } from "react";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../../context/overlaidContentProvider";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import { postForm } from "../../utilities/postForm";
import Image from "../image";
import InputFile from "./fileInput";

interface PropsType {
    onSuccess?: Function;
}

export default function StampNew(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
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

        postForm("/api/admin/stamps/multiplenew", formData).then(() => {
            if ("onSuccess" in props) {
                (props.onSuccess as Function)();
            }
            (removeOverlay as RemoveOverlayFnType)("form", 0);
        });
    }

    function resetFiles() {
        (document.getElementById("files") as HTMLInputElement).value = "";
        setImagePreviews([]);
    }
    return (
        <div className="modal">
            <form
                action=""
                className="modal__form bg--white rounded--15 p-2"
                onSubmit={handleSubmit}
            >
                <h3 className="mt-0">Add New Stamps</h3>
                <InputFile
                    name={"files"}
                    multiple={true}
                    onChange={updateImagePreviews}
                />
                <div className="flex flex--wrap my-2 rounded--15">
                    {imagePreviews.map((preview, index) => (
                        <div className="" key={index}>
                            <Image
                                className={"image--stamp-listing"}
                                image={preview}
                            />
                        </div>
                    ))}
                </div>
                <button className="btn-primary mt-2" type="submit">
                    Submit
                </button>
                <button
                    className="btn-tertiary ml-2"
                    onClick={(e) => {
                        e.preventDefault();
                        resetFiles();
                    }}
                >
                    Reset
                </button>
                <button
                    className="btn-secondary ml-2"
                    onClick={() => {
                        (removeOverlay as RemoveOverlayFnType)("form", 0);
                    }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
