import React from "react";
import { ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";

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
                        className="follow btn-primary"
                        onClick={() => {
                            handleClick("follow");
                        }}
                    >
                        Follow
                    </button>
                );
                break;
            case 1:
                button = (
                    <button
                        className="follow btn-tertiary"
                        onClick={() => {
                            handleClick("unfollow");
                        }}
                    >
                        Cancel
                    </button>
                );
                break;
            case 2:
                button = (
                    <button
                        className="follow btn-secondary"
                        onClick={() => {
                            handleClick("unfollow");
                        }}
                    >
                        Following
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
