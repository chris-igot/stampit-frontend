/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileList from "../components/profileList";
import { ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Following() {
    const navigate = useNavigate();
    const [followed, setFollowed] = useState<ProfileType[]>([]);
    const [followers, setFollowers] = useState<ProfileType[]>([]);
    const [requested, setRequested] = useState<ProfileType[]>([]);

    useEffect(() => {
        getRequested();
        getFollowed();
        getFollowers();
    }, []);

    function getFollowed() {
        getData<ProfileType[]>("/api/profiles/follows/followed").then(
            (output) => {
                switch (output.status) {
                    case 200:
                        setFollowed(output.json);
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            }
        );
    }

    function getFollowers() {
        getData<ProfileType[]>("/api/profiles/follows/followers").then(
            (output) => {
                switch (output.status) {
                    case 200:
                        setFollowers(output.json);
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            }
        );
    }

    function getRequested() {
        getData<ProfileType[]>("/api/profiles/follows/requested").then(
            (output) => {
                switch (output.status) {
                    case 200:
                        setRequested(output.json);
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            }
        );
    }

    function scrollTo(id: string) {
        const listElement = document.getElementById(id) as HTMLDivElement;
        const parent = listElement.parentElement;

        parent?.scrollTo({ left: listElement.offsetLeft - parent?.offsetLeft });
    }

    return (
        <div className="page">
            <div className="flex flex--h-center width--max">
                <button
                    className="btn-secondary m-1"
                    onClick={() => {
                        scrollTo("requested");
                    }}
                >
                    requests ({requested.length})
                </button>
                <button
                    className="btn-secondary m-1"
                    onClick={() => {
                        scrollTo("followed");
                    }}
                >
                    followed ({followed.length})
                </button>
                <button
                    className="btn-secondary m-1"
                    onClick={() => {
                        scrollTo("followers");
                    }}
                >
                    followers ({followers.length})
                </button>
            </div>
            <div className="overflow--scroll scroll-x--hidden scroll-y--hidden width--max no-wrap smoothscroll">
                <ProfileList
                    id="requested"
                    profiles={requested}
                    updateFn={getRequested}
                    request={true}
                />
                <ProfileList
                    id="followed"
                    profiles={followed}
                    updateFn={getFollowed}
                />
                <ProfileList
                    id="followers"
                    profiles={followers}
                    updateFn={getFollowers}
                />
            </div>
        </div>
    );
}
