import React from "react";
import { Link } from "react-router-dom";
import { ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";
import FollowButton from "./followButton";
import Image from "./image";
import noProfilePic from "../icons/round_account_circle_white_48dp.png";

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
                            className="btn-primary"
                            onClick={() => {
                                handleRequestClick("accept", profile);
                            }}
                        >
                            accept
                        </button>
                        <button
                            className="btn-danger ml-1"
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
        <div
            id={props.id}
            className="display--inline-block width--max height--max flex flex--col flex--v-top vertical-align--top"
        >
            {props.profiles.length > 0 ? (
                props.profiles.map((profile, index) => (
                    <div className="profile-list__row" key={index}>
                        <Link to={"/profiles?id=" + profile.id}>
                            <Image
                                className={
                                    profile.image !== null
                                        ? "image--profile-listing"
                                        : "image--profile-listing blank"
                                }
                                image={
                                    profile.image !== null
                                        ? profile.image
                                        : noProfilePic
                                }
                            />
                        </Link>
                        <div>
                            <Link to={"/profiles?id=" + profile.id}>
                                {profile.name}
                            </Link>
                            {profile.isPrivate ? (
                                <span className="tag--dark">private</span>
                            ) : (
                                ""
                            )}
                        </div>
                        {setButton(profile)}
                    </div>
                ))
            ) : (
                <div className="flex flex--h-center">
                    <h3 className="display--inline-block text--gray-5">
                        empty
                    </h3>
                </div>
            )}
        </div>
    );
}
