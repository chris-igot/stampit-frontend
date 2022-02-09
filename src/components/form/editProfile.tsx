import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutputType, ProfileType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import getData from "../../utilities/getData";
import postForm from "../../utilities/postForm";
import Image from "../image";
import InputFile from "./fileInput";
import InputText from "./textInput";

interface PropsType {
    profile: ProfileType;
    onExit?: Function;
    enableFn: (enable: boolean) => void;
}

export default function EditProfile(props: PropsType) {
    const navigate = useNavigate();
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
                className="modal__form editinfo"
                action=""
                onSubmit={handleSubmit}
            >
                <div className="editinfo__image-form">
                    <InputFile
                        name={"file"}
                        label={
                            <Image
                                className={"image--profile"}
                                image={profileImgURL}
                            />
                        }
                        onChange={updateImagePreview}
                    />

                    <div>
                        <button
                            className="btn-gray"
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

                <div className="editinfo__text-form">
                    <InputText
                        name={"title"}
                        value={props.profile.title}
                        onChange={() => {
                            formUpdateState.text = true;
                            setFormUpdateState(formUpdateState);
                        }}
                    />

                    <textarea
                        name="bio"
                        id=""
                        cols={30}
                        rows={3}
                        defaultValue={props.profile.bio}
                        onChange={() => {
                            formUpdateState.text = true;
                            setFormUpdateState(formUpdateState);
                        }}
                    />
                </div>
                <div>
                    <button className="btn-white mr-1" type="submit">
                        Update
                    </button>
                    <button
                        className="btn-gray"
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
