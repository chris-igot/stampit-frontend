import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FollowButton from "../components/followButton";
import EditProfile from "../components/form/editProfile";

import Image from "../components/image";
import { OutputType, PostType, ProfileType } from "../ts_types/types";

import getData from "../utilities/getData";

import PostNew from "../components/form/postNew";

import noProfilePic from "../icons/round_account_circle_white_48dp.png";

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
        isPrivate: true,
        currentlyFollowing: 0,
        followRequested: 0,
        followers: 0,
        followed: 0,
        user: { id: "", username: "", email: "", roles: [] },
    });
    const [posts, setPosts] = useState<PostType[]>([]);

    const [editInfo, setEditInfo] = useState(false);
    const [uploadPic, setUploadPic] = useState(false);
    const [posts403, setPosts403] = useState(false);

    useEffect(() => {
        let postsRoute = "";
        const id = searchParams.get("id");
        if (props.home) {
            postsRoute = "/api/posts/self";
        } else {
            postsRoute = "/api/posts?id=" + id;
        }

        updateProfile();
        getData<PostType[]>(postsRoute).then((output) => {
            switch (output.status) {
                case 200:
                    setPosts(
                        output.json.sort((a, b) =>
                            b.createdAt.localeCompare(a.createdAt)
                        )
                    );
                    setPosts403(false);
                    break;
                case 403:
                    setPosts403(true);
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
            getData<ProfileType>("/api/profiles/home").then((output) => {
                switch (output.status) {
                    case 200:
                        setProfile(output.json);
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
            profileRoute = "/api/profiles/home";
        } else {
            profileRoute = "/api/profiles?id=" + id;
        }
        getData<ProfileType>(profileRoute).then((output) => {
            switch (output.status) {
                case 200:
                    setProfile(output.json);
                    console.log("profile", output.json);
                    break;
                default:
                    navigate("/login");
                    break;
            }
        });
    }

    return (
        <div className="page">
            <div className="width--max flex flex--col pb-1">
                {editInfo && (
                    <EditProfile
                        profile={profile}
                        enableFn={setEditInfo}
                        onExit={() => {
                            updateProfile();
                        }}
                    />
                )}
                {uploadPic && (
                    <PostNew
                        enableFn={setUploadPic}
                        onExit={() => {
                            updateProfile();
                        }}
                    />
                )}
                <div className="flex flex--h-space-between pt-1">
                    <Image
                        className={"image--profile"}
                        image={
                            profile.image != null ? profile.image : noProfilePic
                        }
                    />

                    <div className="flex flex--col flex--h-center width--100px height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {posts.length}
                        </h2>
                        <p className="my-1 mx-0 text--w-300 text--center">
                            posts
                        </p>
                    </div>
                    <div className="flex flex--col flex--h-center width--100px height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {profile.followers}
                        </h2>
                        <p className="my-1 mx-0 text--w-300 text--center">
                            followers
                        </p>
                    </div>
                    <div className="flex flex--col flex--h-center width--100px height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {profile.followed}
                        </h2>
                        <p className="my-1 mx-0 text--w-300 text--center">
                            following
                        </p>
                    </div>
                </div>
                <div>
                    <div className="my-1 p-2 rounded--max bg--white">
                        {!props.home && (
                            <FollowButton
                                profile={profile}
                                onClick={updateProfile}
                            />
                        )}
                        {props.home ? (
                            <React.Fragment>
                                <button
                                    className="btn-primary mr-1"
                                    onClick={() => {
                                        setUploadPic(true);
                                    }}
                                >
                                    upload
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setEditInfo(true);
                                    }}
                                >
                                    edit profile
                                </button>
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="p-2 rounded--15 bg--white">
                        <h4 className="m-0 flex flex--v-center">
                            <span>{profile.name}</span>{" "}
                            {profile.isPrivate ? (
                                <span className="tag--dark ml-1">private</span>
                            ) : (
                                ""
                            )}
                        </h4>
                        <h5 className="m-0">{profile.title}</h5>
                        <p className="m-0">{profile.bio}</p>
                    </div>
                </div>
            </div>
            <div className="pt-1 flex flex--wrap width--max">
                {posts.map((post) => (
                    <Link key={post.id} to={"/posts?postid=" + post.id}>
                        <Image
                            className="image--thumbnail"
                            image={post.image}
                        />
                    </Link>
                ))}
                {posts403 && (
                    <div className="flex flex--col flex--v-center width--max mt-2">
                        <h3 className="m-0">
                            This profile has been set to private
                        </h3>
                        <p className="m-0">Request to follow to view posts</p>
                    </div>
                )}
            </div>
        </div>
    );
}
