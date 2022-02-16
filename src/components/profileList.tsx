import React from "react";
import { Link } from "react-router-dom";
import { ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";
import FollowButton from "./followButton";
import Image from "./image";

interface PropsType {
    profiles: ProfileType[];
    updateFn?: () => void;
}

export default function ProfileList(props: PropsType) {
    return (
        <div className="profile-list">
            {props.profiles.map((profile, index) => (
                <div className="profile-list-row" key={index}>
                    <Link
                        className="profile-list__link"
                        to={"/profile?id=" + profile.id}
                    >
                        <Image
                            className="image--listing"
                            image={profile.image}
                        />
                    </Link>
                    <div className="username">
                        <Link
                            className="profile-list__link"
                            to={"/profile?id=" + profile.id}
                        >
                            {profile.name}
                        </Link>
                    </div>
                    <FollowButton profile={profile} onClick={props.updateFn} />
                </div>
            ))}
        </div>
    );
}
