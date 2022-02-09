import React, { useEffect, useState } from "react";
import ProfileList from "../components/profileList";
import { OutputType, ProfileType } from "../ts_types/types";
import getData from "../utilities/getData";

export default function Following() {
    const [following, setFollowing] = useState<ProfileType[]>([]);
    useEffect(() => {
        getFollowing();
    }, []);

    function getFollowing() {
        getData<ProfileType[]>("/api/profiles/ownfollows").then((output) => {
            switch (output.status) {
                case 200:
                    setFollowing(output.json);
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <div className="page">
            <ProfileList profiles={following} updateFn={getFollowing} />
        </div>
    );
}
