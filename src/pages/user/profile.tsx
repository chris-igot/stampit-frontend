import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FollowButton from "../../components/followButton";
import EditProfile from "../../components/form/editProfile";

import Image from "../../components/image";
import { OutputType, PostType, ProfileType } from "../../ts_types/types";

import getData from "../../utilities/getData";

import PostNew from "./postNew";

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
        currentlyFollowing: false,
        followers: 0,
        amFollowing: 0,
    });
    const [posts, setPosts] = useState<PostType[]>([]);

    const [editInfo, setEditInfo] = useState(false);
    const [uploadPic, setUploadPic] = useState(false);

    useEffect(() => {
        let postsRoute = "";
        const id = searchParams.get("id");
        if (props.home) {
            postsRoute = "/api/posts/self";
        } else {
            postsRoute = "/api/posts/user?id=" + id;
        }

        updateProfile();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.home) {
            getData("/api/home").then((output) => {
                const data = output as OutputType;
                console.log("EDITING INFO", props.home);
                switch (data.status) {
                    case 200:
                        setProfile(data.json as ProfileType);
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editInfo]);

    function updateProfile() {
        let profileRoute = "";

        const id = searchParams.get("id");
        if (props.home) {
            profileRoute = "/api/home";
        } else {
            profileRoute = "/api/profile?id=" + id;
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
    }

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
                        setEditInfo(true);
                    } else {
                        console.log("cannot edit");
                    }
                }}
            >
                <h6 className="profile__header--title">{profile.title}</h6>
                <p className="profile__header--bio">{profile.bio}</p>
            </div>
        );

        const noInfo = (
            <div
                onClick={() => {
                    if (props.home) {
                        console.log("edit");
                        setEditInfo(true);
                    }
                }}
            >
                Add profile info
            </div>
        );

        if (props.home) {
            if (profile.title === null && profile.bio === null) {
                return noInfo;
            } else {
                return infoText;
            }
        } else {
            return infoText;
        }
    }

    return (
        <div className="page">
            <div className="profile__header">
                {editInfo && (
                    <EditProfile profile={profile} enableFn={setEditInfo} />
                )}
                {uploadPic && <PostNew enableFn={setUploadPic} />}
                <Image
                    className={
                        props.home
                            ? "image--profile editable"
                            : "image--profile"
                    }
                    image={profile.image}
                    onClick={() => {
                        if (props.home) {
                            setEditInfo(true);
                        }
                    }}
                />
                <div className="profile__header--stuff">
                    <div>
                        <h2>{posts.length}</h2>
                        <p>posts</p>
                    </div>
                    <div>
                        <h2>{profile.followers}</h2>
                        <p>followers</p>
                    </div>
                    <div>
                        <h2>{profile.amFollowing}</h2>
                        <p>following</p>
                    </div>
                </div>
                <div className="profile__header--info">
                    {!props.home && (
                        <FollowButton
                            profile={profile}
                            onClick={updateProfile}
                        />
                    )}
                    {props.home ? (
                        <button
                            className="btn-blue"
                            onClick={() => {
                                setUploadPic(true);
                            }}
                        >
                            upload
                        </button>
                    ) : (
                        ""
                    )}
                    <h5 className="profile__header--name">{profile.name}</h5>
                    {displayInfo()}
                </div>
            </div>
            <div className="thumbnails">
                {posts.map((post) => (
                    <Link key={post.id} to={"/post?id=" + post.id}>
                        <Image
                            className="image--thumbnail"
                            image={post.image}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
