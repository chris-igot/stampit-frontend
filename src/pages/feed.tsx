import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/image";
import { OutputType, PostType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Feed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        getData<PostType[]>("/api/posts/followed").then((output) => {
            switch (output.status) {
                case 200:
                    setPosts(
                        (output.json as PostType[]).sort((a, b) =>
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
            <div className="thumbnails">
                {posts.map((post) => (
                    <Link key={post.id} to={"/posts?postid=" + post.id}>
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