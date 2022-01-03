import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ImageRect from "../components/imageRect";
import { OutputType, PostType, ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Post() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [post, setPost] = useState<PostType>({
        id: "",
        profile: "",
        image: "",
        stamps: [],
        createdAt: "",
    });
    const [profile, setProfile] = useState({
        id: "",
        name: "",
        image: "",
        title: "",
        bio: "",
    });

    useEffect(() => {
        getData(`/api/post?id=${searchParams.get("id")}`).then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    console.log(data.json);
                    setPost(data.json as PostType);
                    getData(
                        "/api/profile?id=" + (data.json as PostType).profile
                    ).then((output2) => {
                        console.log("profile", (output2 as OutputType).json);
                        setProfile((output2 as OutputType).json as ProfileType);
                    });
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
    }, []);
    return (
        <div>
            <ImageRect image={post.image} />
            <div>
                <Link to={"/profile?id=" + profile.id}>{profile.name}</Link>
            </div>
        </div>
    );
}
