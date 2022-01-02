import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSquare from "../components/imageSquare";
import { PostType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Public() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        getData("/api/public", navigate).then((posts) => {
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
            <div className="public-photos">
                {posts.map((post) => (
                    <ImageSquare key={post.id} image={post.image} />
                ))}
            </div>
        </div>
    );
}
