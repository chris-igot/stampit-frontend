import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Image from "../components/image";
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
    const [amFollowing, setAmFollowing] = useState(false);

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
    return (
        <div className="page">
            <div className="profile__header">
                <Image
                    class="profile__header--imageself"
                    image={profile.image}
                />
                <div className="profile__header--stuff">
                    {!props.home && (
                        <p>{amFollowing ? "following" : "not following"}</p>
                    )}
                </div>
                <div className="profile__header--info">
                    <h5 className="profile__header--name">{profile.name}</h5>
                    <h6 className="profile__header--title">{profile.title}</h6>
                    <p className="profile__header--bio">{profile.bio}</p>
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
