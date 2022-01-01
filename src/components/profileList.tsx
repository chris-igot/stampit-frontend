import React from "react";
import { ProfileType } from "../ts_types/types";
import ImageSquare from "./imageSquare";

interface PropsType {
    profiles: ProfileType[];
}

export default function ProfileList(props: PropsType) {
    return (
        <div className="profilelist">
            {props.profiles.map((profile, index) => (
                <div key={index}>
                    <a href={"/api/profile?id=" + profile.id}>
                        <ImageSquare image={profile.image} />
                        <span>{profile.name}</span>
                    </a>
                    <span>button here</span>
                </div>
            ))}
        </div>
    );
}
