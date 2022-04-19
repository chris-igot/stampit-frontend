import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FollowButton from "../components/followButton";
import EditProfile from "../components/form/editProfile";
import Image from "../components/image";
import { PostType, ProfileType } from "../ts_types/types";
import PostNew from "../components/form/postNew";
import noProfilePic from "../icons/round_account_circle_white_48dp.png";
import {
    AddOverlayFnType,
    overlayContext,
} from "../context/overlaidContentProvider";
import useAPIResource from "../hooks/useAPIResource";

interface PropsType {
    home?: boolean;
}

const defaultProfile = {
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
};

export default function Profile(props: PropsType = { home: false }) {
    const { addOverlay } = useContext(overlayContext);
    const navigate = useNavigate();
    const profileResource = useAPIResource<ProfileType>(
        (arg = "") => "/api/profiles" + arg,
        defaultProfile,
        {
            500: () => {
                navigate("/login");
            },
        }
    );
    const postsResource = useAPIResource<PostType[]>(
        (arg = "") => "/api/posts" + arg,
        [],
        {
            200: () => {
                setPosts403(false);
            },
            403: () => {
                setPosts403(true);
            },
        }
    );
    const [searchParams] = useSearchParams();
    const [posts403, setPosts403] = useState(false);

    useEffect(() => {
        updateProfile();
        updatePosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateProfile();
        updatePosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.home]);

    function updateProfile() {
        const id = searchParams.get("id");
        if (props.home) {
            profileResource.refresh("/home");
        } else {
            profileResource.refresh("?id=" + id);
        }
    }

    function updatePosts() {
        const id = searchParams.get("id");
        if (props.home) {
            postsResource.refresh("/self");
        } else {
            postsResource.refresh("?id=" + id);
        }
    }

    return (
        <div className="page">
            <div className="width--max flex flex--col">
                <div className="flex flex--h-space-between flex--wrap pt-1 px-4">
                    <Image
                        className={
                            profileResource.data.image !== null
                                ? "image--profile m-1"
                                : "image--profile m-1 blank"
                        }
                        image={
                            profileResource.data.image !== null
                                ? profileResource.data.image
                                : noProfilePic
                        }
                    />

                    <div className="flex flex--col flex--h-center width--100px m-1 height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {postsResource.data.length}
                        </h2>
                        <p className="my-1 mx-0 text--w-300 text--center">
                            posts
                        </p>
                    </div>
                    <div className="flex flex--col flex--h-center width--100px m-1 height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {profileResource.data.followers}
                        </h2>
                        <p className="my-1 mx-0 text--w-300 text--center">
                            followers
                        </p>
                    </div>
                    <div className="flex flex--col flex--h-center width--100px m-1 height--100px rounded--max bg--white">
                        <h2 className="text--center text--w-700 my-1 mx-0">
                            {profileResource.data.followed}
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
                                profile={profileResource.data}
                                onClick={updateProfile}
                            />
                        )}
                        {props.home ? (
                            <React.Fragment>
                                <button
                                    className="btn-primary mr-1"
                                    onClick={() => {
                                        (addOverlay as AddOverlayFnType)(
                                            "form",
                                            <PostNew
                                                key={"postNew"}
                                                onExit={() => {
                                                    updatePosts();
                                                }}
                                            />
                                        );
                                    }}
                                >
                                    upload
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        (addOverlay as AddOverlayFnType)(
                                            "form",
                                            <EditProfile
                                                key={"editProfile"}
                                                profile={profileResource.data}
                                                onExit={() => {
                                                    updateProfile();
                                                }}
                                            />
                                        );
                                    }}
                                >
                                    edit profile
                                </button>
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="p-2 rounded--20 bg--white">
                        <h4 className="m-0 flex flex--v-center">
                            <span className="mr-1">
                                {profileResource.data.name}
                            </span>{" "}
                            {profileResource.data.isPrivate ? (
                                <span className="tag--dark">private</span>
                            ) : (
                                ""
                            )}
                        </h4>
                        <h5 className="m-0">{profileResource.data.title}</h5>
                        <p className="m-0">{profileResource.data.bio}</p>
                    </div>
                </div>
            </div>
            <div className="pt-1 flex flex--wrap width--max">
                {postsResource.data.map((post) => (
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
