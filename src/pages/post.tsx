/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Image from "../components/image";
import StampListContainer from "../components/stampListContainer";
import { PostType, StampType } from "../ts_types/types";
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
        createdAt: "",
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
            <div className="bg--white rounded--20 px-1 pb-2 mt-1">
                <p className="my-1 mx-2">
                    <Link to={"/profiles?id=" + post.profile}>
                        {post.profileName}
                    </Link>
                </p>
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
                                left: `calc(${stamp.x / 100}% - 24px)`,
                                top: `calc(${stamp.y / 100}% - 24px)`,
                            }}
                        >
                            <img src={stamp.image} alt="" />
                        </div>
                    ))}
                </div>

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
