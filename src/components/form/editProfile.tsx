import React, { useEffect, useState } from "react";
import { ProfileType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import postForm from "../../utilities/postForm";
import Image from "../image";
import InputCheckbox from "./checkboxInput";
import InputFile from "./fileInput";
import InputText from "./textInput";

interface PropsType {
    profile: ProfileType;
    onExit?: Function;
    enableFn: (enable: boolean) => void;
}

export default function EditProfile(props: PropsType) {
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

    function submitProfilePic(formData: FormData) {
        postForm("/api/profiles/home/setimage", formData).then((output) => {
            switch (output.status) {
                case 200:
                    if ("onExit" in props) {
                        (props.onExit as Function)();
                    }
                    break;
                default:
                    return;
            }
        });
    }

    function submitInfo(formData: FormData) {
        postForm("/api/profiles/home/edit", formData).then((output) => {
            switch (output.status) {
                case 200:
                    if ("onExit" in props) {
                        (props.onExit as Function)();
                    }
                    break;
                case 418:
                    break;
                default:
                    break;
            }
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.enableFn(false);
        console.log(formUpdateState);
        if (formUpdateState.image) {
            let formData = convertInputToFormData(e);
            formData.delete("title");
            formData.delete("bio");
            submitProfilePic(formData);
        }
        if (formUpdateState.text) {
            let formData = convertInputToFormData(e);
            formData.delete("file");
            submitInfo(formData);
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
                        value={props.profile.title}
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
                            props.enableFn(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
