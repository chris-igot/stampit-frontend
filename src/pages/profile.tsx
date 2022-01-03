import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ImageSquare from "../components/imageSquare";
import { OutputType, PostType, ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";

interface PropsType {
    home?: boolean;
}

export default function Profile(props: PropsType) {
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

    useEffect(() => {
        let profileRoute = "";
        let postsRoute = "";
        if ("home" in props ? props.home : false) {
            profileRoute = "/api/home";
            postsRoute = "/api/posts/self";
        } else {
            profileRoute = `/api/profile?id=${searchParams.get("id")}`;
            postsRoute = `/api/posts/user?id=${searchParams.get("id")}`;
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
    return (
        <div>
            <div className="profile-header">
                <ImageSquare image={profile.image} />
                <div className="stuff">{profile.name}</div>
                <div className="info">
                    <h6>{profile.title}</h6>
                    <p>{profile.bio}</p>
                </div>
            </div>
            <div className="profile-photos">
                {posts.map((post) => (
                    <Link key={post.id} to={"/post?id=" + post.id}>
                        <ImageSquare image={post.image} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
