import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../../context/overlaidContentProvider";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";
import InputFile from "./fileInput";
import InputText from "./textInput";

interface PropsType {
    onExit?: Function;
}

export default function PostNew(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = convertInputToFormData(e);
        postForm("/api/posts/new", formData).then((output) => {
            switch (output.status) {
                case 200:
                    if ("onExit" in props) {
                        (props.onExit as Function)();
                    }
                    (removeOverlay as RemoveOverlayFnType)("form", 0);

                    break;
                default:
                    navigate("/home");
                    return;
            }
        });
    }
    return (
        <div key={"postNew"} className="page modal">
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
