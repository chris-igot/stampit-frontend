import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputText from "../components/form/textInput";
import Image from "../components/image";
import { OutputType, PostType, ProfileType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import getData from "../utilities/getData";
import postForm from "../utilities/postForm";

interface PropsType {
    home?: boolean;
}

export default function Profile(props: PropsType = { home: false }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileType>({
        id: "",
        name: "",
        image: "",
        title: "",
        bio: "",
    });
    const [posts, setPosts] = useState<PostType[]>([]);
    const [amFollowing, setAmFollowing] = useState(false);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        let profileRoute = "";
        let postsRoute = "";
        const id = searchParams.get("id");
        if (props.home) {
            profileRoute = "/api/home";
            postsRoute = "/api/posts/self";
        } else {
            profileRoute = "/api/profile?id=" + id;
            postsRoute = "/api/posts/user?id=" + id;
            getData("/api/profile/amfollowing?id=" + id).then((output) => {
                const data = output as OutputType;
                if (data.status === 200) {
                    setAmFollowing(data.json as boolean);
                }
            });
        }

        getData(profileRoute).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    console.log(data.json);
                    setProfile(data.json as ProfileType);
                    break;
                default:
                    navigate("/login");
                    break;
            }
        });
        getData(postsRoute).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    console.log(data.json);
                    setPosts(
                        (data.json as PostType[]).sort((a, b) =>
                            b.createdAt.localeCompare(a.createdAt)
                        )
                    );
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
    }, []);

    function displayInfo() {
        const infoText = (
            <div
                className={
                    props.home
                        ? "profile_header--texts editable"
                        : "profile_header--texts"
                }
                onClick={() => {
                    if (props.home) {
                        console.log("edit");
                        setEditable(true);
                    } else {
                        console.log("cannot edit");
                    }
                }}
            >
                <h6 className="profile__header--title">{profile.title}</h6>
                <p className="profile__header--bio">{profile.bio}</p>
            </div>
        );

        const infoForm = (
            <form
                className="profile_header--texts"
                action=""
                method="post"
                // onBlur={() => {
                //     setEditable(false);
                // }}
            >
                <input
                    type="text"
                    name="title"
                    id=""
                    defaultValue={profile.title}
                />

                <textarea
                    name="bio"
                    id=""
                    cols={30}
                    rows={3}
                    defaultValue={profile.bio}
                />

                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("submit");
                        handleSubmit(e);
                    }}
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setEditable(false);
                    }}
                >
                    cancel
                </button>
            </form>
        );

        const noInfo = (
            <div
                onClick={() => {
                    console.log("edit");
                    setEditable(true);
                }}
            >
                Add profile info
            </div>
        );

        if (props.home) {
            if (editable) {
                return infoForm;
            } else {
                if (profile.title === null && profile.bio === null) {
                    return noInfo;
                } else {
                    return infoText;
                }
            }
        } else {
            return infoText;
        }
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const formData = convertInputToFormData(e);
        console.log("submit2", formData, e.currentTarget.parentNode);
        postForm("/api/home/edit", formData).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    getData("/api/home").then((output) => {
                        const data = output as OutputType;
                        switch (data.status) {
                            case 200:
                                console.log(data.json);
                                setProfile(data.json as ProfileType);
                                break;
                            default:
                                navigate("/login");
                                break;
                        }
                    });
                    setEditable(false);
                    break;
                case 418:
                    //TODO: error here
                    break;
                default:
                    break;
            }
        });
    }

    function updateProfile() {}

    function updatePosts() {}
    return (
        <div className="page">
            <div className="profile__header">
                <Image
                    class={
                        props.home
                            ? "profile__header--imageself editable"
                            : "profile__header--imageself"
                    }
                    image={profile.image}
                />
                <div className="profile__header--stuff">
                    {!props.home && (
                        <p>{amFollowing ? "following" : "not following"}</p>
                    )}
                </div>
                <div className="profile__header--info">
                    <h5 className="profile__header--name">{profile.name}</h5>
                    {displayInfo()}
                </div>
            </div>
            <div className="profile__images">
                {posts.map((post) => (
                    <Link key={post.id} to={"/post?id=" + post.id}>
                        <Image
                            class="profile__images--image"
                            image={post.image}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
