import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/image";
import { PostType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Feed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        getData<PostType[]>("/api/posts/followed").then((output) => {
            switch (output.status) {
                case 200:
                    setPosts(output.json as PostType[]);
                    break;
                default:
                    navigate("/login");
                    return;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="page">
            <div className="pt-1 flex flex--wrap width--max">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="width--max mb-1 px-1 pb-4 rounded--20 bg--white"
                    >
                        <p className="my-1 mx-2">
                            <Link to={"/profiles?id=" + post.profile}>
                                {post.profileName}
                            </Link>
                        </p>
                        <Link to={"/posts?postid=" + post.id}>
                            <Image className="image--full" image={post.image} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
