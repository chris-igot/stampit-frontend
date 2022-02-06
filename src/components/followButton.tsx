import React from "react";
import { OutputType, ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";
interface PropsType {
    profile: ProfileType;
    onClick?: (output: void | OutputType) => void;
}
export default function FollowButton(props: PropsType) {
    return (
        <React.Fragment>
            {props.profile.currentlyFollowing ? (
                <button
                    className="follow btn-white"
                    onClick={() => {
                        getData(
                            "/api/profiles/unfollow?id=" + props.profile.id,
                            "status"
                        ).then(
                            props.onClick as (output: void | OutputType) => void
                        );
                    }}
                >
                    Following
                </button>
            ) : (
                <button
                    className="follow btn-blue"
                    onClick={() => {
                        getData(
                            "/api/profiles/follow?id=" + props.profile.id,
                            "status"
                        ).then(
                            props.onClick as (output: void | OutputType) => void
                        );
                    }}
                >
                    Follow
                </button>
            )}
        </React.Fragment>
    );
}
