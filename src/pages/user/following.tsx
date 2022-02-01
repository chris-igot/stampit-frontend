import React, { useEffect, useState } from "react";
import ProfileList from "../../components/profileList";
import { OutputType, ProfileType } from "../../ts_types/types";
import getData from "../../utilities/getData";

export default function Following() {
    const [following, setFollowing] = useState<ProfileType[]>([]);
    useEffect(() => {
        getFollowing();
    }, []);

    function getFollowing() {
        getData("/api/profile/follows").then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    console.log(data.json);
                    setFollowing(data.json as ProfileType[]);
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
