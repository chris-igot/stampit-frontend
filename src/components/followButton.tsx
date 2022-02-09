import React from "react";
import { OutputType, ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";
import Image from "./image";

import person_add from "../icons/round_person_add_white_48dp.png";
import person_remove from "../icons/round_person_remove_black_48dp.png";
interface PropsType {
    profile: ProfileType;
    onClick?: Function;
}
export default function FollowButton(props: PropsType) {
    function handleClick(follow: string) {
        getData(
            `/api/profiles/${follow}?id=` + props.profile.id,
            "status"
        ).then(() => {
            (props.onClick as Function)();
        });
    }
    return (
        <React.Fragment>
            {props.profile.currentlyFollowing ? (
                <button
                    className="follow btn-white--image"
                    onClick={(e) => {
                        handleClick("unfollow");
                    }}
                >
                    <Image className="image--icon-sm" image={person_remove} />
                </button>
            ) : (
                <button
                    className="follow btn-blue--image"
                    onClick={() => {
                        handleClick("follow");
                    }}
                >
                    <Image className="image--icon-sm" image={person_add} />
                </button>
            )}
        </React.Fragment>
    );
}
