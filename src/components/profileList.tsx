import React from "react";
import { Link } from "react-router-dom";
import { ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";
import FollowButton from "./followButton";
import Image from "./image";

interface PropsType {
    profiles: ProfileType[];
    id?: string;
    request?: boolean;
    updateFn?: () => void;
}

export default function ProfileList(props: PropsType) {
    function handleRequestClick(follow: string, profile: ProfileType) {
        getData(`/api/profiles/${follow}?id=` + profile.id, "status").then(
            () => {
                (props.updateFn as Function)();
            }
        );
    }

    function setButton(profile: ProfileType) {
        let button: JSX.Element;
        if (props.request) {
            if (profile.followRequested === 1) {
                button = (
                    <React.Fragment>
                        <button
                            className="btn-white"
                            onClick={() => {
                                handleRequestClick("accept", profile);
                            }}
                        >
                            accept
                        </button>
                        <button
                            className="btn-red ml-1"
                            onClick={() => {
                                handleRequestClick("reject", profile);
                            }}
                        >
                            reject
                        </button>
                    </React.Fragment>
                );
            } else {
                button = <span></span>;
            }
        } else {
            button = (
                <FollowButton profile={profile} onClick={props.updateFn} />
            );
        }
        return button;
    }
    return (
        <div id={"id" in props ? props.id : undefined} className="width--max">
            {props.profiles.map((profile, index) => (
                <div className="profile-list__row" key={index}>
                    <Link
                        className="profile-list__link"
                        to={"/profiles?id=" + profile.id}
                    >
                        <Image
                            className="image--listing"
                            image={profile.image}
                        />
                    </Link>
                    <div>
                        <Link
                            className="profile-list__link"
                            to={"/profiles?id=" + profile.id}
                        >
                            {profile.name}
                        </Link>
                        {profile.isPrivate ? (
                            <span className="tag--light">private</span>
                        ) : (
                            ""
                        )}
                    </div>
                    {setButton(profile)}
                </div>
            ))}
        </div>
    );
}
