import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutputType, ProfileType } from "../../ts_types/types";
import convertInputToFormData from "../../utilities/convertInputToFormData";
import getData from "../../utilities/getData";
import postForm from "../../utilities/postForm";
import Image from "../image";

interface PropsType {
    profile: ProfileType;
    enableFn: (enable: boolean) => void;
}

export default function EditProfile(props: PropsType) {
    const navigate = useNavigate();
    const [profileImgURL, setProfileImgURL] = useState(props.profile.image);
    // const first = useRef(second);

    useEffect(() => {
        return () => {};
    }, []);

    function updateImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
        const file = (e.currentTarget.files as FileList)[0];
        let newSrc = URL.createObjectURL(file);
        setProfileImgURL(newSrc);
    }

    function resetImage() {
        setProfileImgURL(props.profile.image);
    }

    function handlePicSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = convertInputToFormData(e);
        postForm("/api/profiles/home/setimage", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    navigate("/home");
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
    }

    function handleInfoSubmit(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const formData = convertInputToFormData(e);
        console.log("submit2", formData, e.currentTarget.parentNode);
        postForm("/api/profiles/home/edit", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    getData("/api/profiles/home").then((output) => {
                        const data = output as OutputType;
                        switch (data.status) {
                            case 200:
                                console.log(data.json);
                                // setProfile(data.json as ProfileType);
                                break;
                            default:
                                navigate("/login");
                                break;
                        }
                    });
                    props.enableFn(false);
                    break;
                case 418:
                    //TODO: error here
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <div className="modal">
            <div className="modal__form editinfo">
                <button
                    className="cancel btn-clear"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        props.enableFn(false);
                    }}
                >
                    X
                </button>
                <form className="editinfo__image-form" action="" method="post">
                    <Image className={"image--profile"} image={profileImgURL} />

                    <div className="editinfo__image-form-controls">
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={updateImagePreview}
                        />
                        <button
                            type="submit"
                            className="btn-white"
                            onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                                e.preventDefault();
                                handlePicSubmit(e);
                                props.enableFn(false);
                            }}
                        >
                            Update
                        </button>
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
                </form>

                <form className="editinfo__image-form" action="" method="post">
                    <input
                        type="text"
                        name="title"
                        id=""
                        defaultValue={props.profile.title}
                    />

                    <textarea
                        name="bio"
                        id=""
                        cols={30}
                        rows={3}
                        defaultValue={props.profile.bio}
                    />

                    <button
                        className="btn-white"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("submit");
                            handleInfoSubmit(e);
                        }}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
