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

    function setButton() {
        let button: JSX.Element;

        switch (props.profile.currentlyFollowing) {
            case 0:
                button = (
                    <button
                        className="follow btn-blue--image"
                        onClick={() => {
                            handleClick("follow");
                        }}
                    >
                        <Image className="image--icon-sm" image={person_add} />
                    </button>
                );
                break;
            case 1:
                button = (
                    <button
                        className="follow btn-blue--image ghost"
                        onClick={() => {
                            handleClick("unfollow");
                        }}
                    >
                        <Image className="image--icon-sm" image={person_add} />
                    </button>
                );
                break;
            case 2:
                button = (
                    <button
                        className="follow btn-white--image"
                        onClick={() => {
                            handleClick("unfollow");
                        }}
                    >
                        <Image
                            className="image--icon-sm"
                            image={person_remove}
                        />
                    </button>
                );
                break;

            default:
                button = <button />;
                break;
        }
        return button;
    }
    return <React.Fragment>{setButton()}</React.Fragment>;
}
