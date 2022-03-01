import React, { useContext, useState } from "react";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../../context/overlaidContentProvider";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import { postForm } from "../../utilities/postForm";
import InputFile from "./fileInput";
import InputText from "./textInput";
import Image from "../image";

interface PropsType {
    onExit?: Function;
}

export default function PostNew(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
    const [imgPreview, setImgPreview] = useState<string | undefined>(undefined);

    function updateImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.currentTarget.files as FileList)[0];
        let newSrc = URL.createObjectURL(file);

        setImgPreview(newSrc);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        postForm("/api/posts/new", convertInputToFormData(e), () => {
            if ("onExit" in props) {
                (props.onExit as Function)();
            }
            (removeOverlay as RemoveOverlayFnType)("form", 0);
        });
    }
    return (
        <div className="page modal">
            <form
                className="modal__form width--25"
                action=""
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="width--max flex flex--h-center mb-2">
                    <InputFile
                        className={
                            imgPreview === undefined
                                ? "btn-secondary mt-1 mb-1"
                                : ""
                        }
                        name={"file"}
                        label={
                            imgPreview === undefined ? (
                                "Select photo"
                            ) : (
                                <Image
                                    className="image--thumbnail-add"
                                    image={imgPreview}
                                ></Image>
                            )
                        }
                        onChange={updateImagePreview}
                    />
                </div>
                <InputText name={"description"} width={"100%"} />

                <button className="btn-primary mt-1 mr-1" type="submit">
                    Post!
                </button>

                <button
                    className="btn-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        (removeOverlay as RemoveOverlayFnType)("form", 0);
                    }}
                >
                    cancel
                </button>
            </form>
        </div>
    );
}
