import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImageSquare from "../components/imageSquare";
import { PostType, ProfileType } from "../ts_types/types";
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
        getData(profileRoute, navigate).then((profile) => {
            console.log(profile);
            setProfile(profile);
        });
        getData(postsRoute, navigate).then((posts) => {
            console.log(posts);
            setPosts(
                (posts as PostType[]).sort((a, b) =>
                    b.createdAt.localeCompare(a.createdAt)
                )
            );
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
                    <ImageSquare key={post.id} image={post.image} />
                ))}
            </div>
        </div>
    );
}
