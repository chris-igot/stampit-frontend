import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageSquare from "../components/imageSquare";
import { OutputType, PostType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Public() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        getData("/api/public").then((output) => {
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
            <div className="public-photos">
                {posts.map((post) => (
                    <Link key={post.id} to={"/post?id=" + post.id}>
                        <ImageSquare image={post.image} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
