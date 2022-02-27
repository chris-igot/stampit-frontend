import React, { useContext } from "react";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../../context/overlaidContentProvider";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import { postForm } from "../../utilities/postForm";
import InputFile from "./fileInput";
import InputText from "./textInput";

interface PropsType {
    onExit?: Function;
}

export default function PostNew(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
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
                className="modal__form"
                action=""
                method="post"
                onSubmit={handleSubmit}
            >
                <InputFile
                    className="btn-secondary mt-1 mb-1"
                    name={"file"}
                    listFiles={true}
                />

                <InputText name={"description"} />
                <button className="btn-primary mt-2 mr-1" type="submit">
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
