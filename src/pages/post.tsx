/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Image from "../components/image";
import StampListContainer from "../components/stampListContainer";
import { PostType, ProfileType, StampType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Post() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [post, setPost] = useState<PostType>({
        id: "",
        profile: "",
        profileName: "",
        image: "",
        stamps: [],
        description: "",
        createdAt: "",
    });
    const [viewerProfile, setViewerProfile] = useState({
        id: "",
        name: "",
        image: "",
        title: "",
        bio: "",
    });
    const [stamps, setStamps] = useState<StampType[]>([]);
    const [stampEnabled, setStampEnabled] = useState(false);
    const [selectedStamp, setSelectedStamp] = useState("");

    useEffect(() => {
        const postId = searchParams.get("postid");
        getData<PostType>("/api/posts/" + postId).then((output) => {
            switch (output.status) {
                case 200:
                    setPost(output.json);
                    getData<ProfileType>("/api/profiles/home").then(
                        (output2) => {
                            setViewerProfile(output2.json);
                        }
                    );
                    break;
                case 403:
                    navigate(-1);
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
        getData<StampType[]>("/api/stamps?postid=" + postId).then((output2) => {
            setStamps(output2.json);
        });
    }, []);

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (selectedStamp !== "") {
            const targetDiv = e.currentTarget;

            const rect = targetDiv.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const boxDimX = rect.right - rect.left;
            const boxDimY = rect.bottom - rect.top;
            const postId = searchParams.get("postid");
            let form = new FormData();

            form.append("x", Math.floor(x) as unknown as Blob);
            form.append("y", Math.floor(y) as unknown as Blob);
            form.append("boxDimX", Math.floor(boxDimX) as unknown as Blob);
            form.append("boxDimY", Math.floor(boxDimY) as unknown as Blob);
            form.append("postId", postId as string);
            form.append("stampId", selectedStamp);

            fetch("/api/stamps/new", {
                method: "POST",
                body: form,
            }).then(() => {
                getData<StampType[]>(
                    "/api/stamps?postid=" + postId,
                    "json"
                ).then((output2) => {
                    setStamps(output2.json);
                });
            });
        }
    }

    return (
        <div className="page">
            <div className="width--max px-1 pb-2 mt-1 bg--white rounded--20">
                <div className="my-1 mx-2 flex flex--h-space-between">
                    <Link to={"/profiles?id=" + post.profile}>
                        {post.profileName}
                    </Link>
                    {viewerProfile.id === post.profile ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                            className="text--red-5"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                fetch(`/api/posts/${post.id}/remove`);
                                navigate("/home");
                            }}
                        >
                            remove
                        </a>
                    ) : (
                        ""
                    )}
                </div>
                <div
                    className={
                        stampEnabled
                            ? "position--rel overflow--hidden cursor--pointer"
                            : "position--rel overflow--hidden"
                    }
                    onClick={(e) => {
                        if (stampEnabled) {
                            handleClick(e);
                        }
                    }}
                >
                    <Image className="image--full" image={post.image} />
                    {stamps.map((stamp) => (
                        <div
                            key={stamp.id}
                            className="image--stamp"
                            style={{
                                left: `calc(${stamp.x / 100}% - 3vw)`,
                                top: `calc(${stamp.y / 100}% - 3vw)`,
                            }}
                        >
                            <img src={stamp.image} alt="" />
                        </div>
                    ))}
                </div>
                {post.description !== "" ? (
                    <p className="m-0 p-1">{post.description}</p>
                ) : (
                    ""
                )}
                <div className="position--rel flex flex--h-space-between">
                    <StampListContainer
                        onClick={setSelectedStamp}
                        captureActivation={setStampEnabled}
                    />
                </div>
            </div>
        </div>
    );
}
