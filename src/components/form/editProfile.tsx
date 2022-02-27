import React, { useContext, useEffect, useState } from "react";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../../context/overlaidContentProvider";
import { ProfileType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import { postForm } from "../../utilities/postForm";
import Image from "../image";
import InputCheckbox from "./checkboxInput";
import InputFile from "./fileInput";
import InputText from "./textInput";

interface PropsType {
    profile: ProfileType;
    onExit?: Function;
}

export default function EditProfile(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
    const [profileImgURL, setProfileImgURL] = useState(props.profile.image);
    const [formUpdateState, setFormUpdateState] = useState({
        image: false,
        text: false,
    });

    useEffect(() => {
        return () => {};
    }, []);

    function updateImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.currentTarget.files as FileList)[0];
        let newSrc = URL.createObjectURL(file);

        formUpdateState.image = true;
        setFormUpdateState(formUpdateState);
        setProfileImgURL(newSrc);
    }

    function resetImage() {
        (document.getElementById("file") as HTMLInputElement).value = "";
        formUpdateState.image = false;
        setFormUpdateState(formUpdateState);
        setProfileImgURL(props.profile.image);
    }

    async function submitProfilePic(formData: FormData) {
        await postForm("/api/profiles/home/setimage", formData, () => {
            if ("onExit" in props) {
                (props.onExit as Function)();
            }
            (removeOverlay as RemoveOverlayFnType)("form", 0);
        });
    }

    async function submitInfo(formData: FormData) {
        await postForm("/api/profiles/home/edit", formData, () => {
            if ("onExit" in props) {
                (props.onExit as Function)();
            }
            (removeOverlay as RemoveOverlayFnType)("form", 0);
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formUpdateState);
        let formData1 = convertInputToFormData(e);

        if (formUpdateState.image) {
            await submitProfilePic(formData1);
        }

        if (formUpdateState.text) {
            await submitInfo(formData1);
        }
    }
    return (
        <div className="modal">
            <form
                className="modal__form width--50"
                action=""
                onSubmit={handleSubmit}
            >
                <div className="flex">
                    <InputFile
                        name={"file"}
                        className=""
                        label={
                            <Image
                                className={"image--profile"}
                                image={profileImgURL}
                            />
                        }
                        onChange={updateImagePreview}
                    />

                    <div className="flex flex--v-center">
                        <button
                            className="btn-tertiary"
                            onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                                e.preventDefault();
                                resetImage();
                            }}
                        >
                            reset
                        </button>
                    </div>
                </div>

                <div>
                    <InputText
                        width="100%"
                        name={"title"}
                        defaultValue={props.profile.title}
                        onChange={() => {
                            formUpdateState.text = true;
                            setFormUpdateState(formUpdateState);
                        }}
                    />

                    <InputCheckbox
                        name={"isPrivate"}
                        label="Set profile as private?"
                        checked={props.profile.isPrivate}
                        onChange={() => {
                            formUpdateState.text = true;
                            setFormUpdateState(formUpdateState);
                        }}
                    />

                    <div className="form__input--textarea">
                        <textarea
                            name="bio"
                            id=""
                            cols={30}
                            rows={3}
                            defaultValue={props.profile.bio}
                            placeholder={"Bio"}
                            onChange={() => {
                                formUpdateState.text = true;
                                setFormUpdateState(formUpdateState);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn-primary mr-1" type="submit">
                        Update
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            (removeOverlay as RemoveOverlayFnType)("form", 0);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
