import React, { useState, useEffect } from "react";

interface PropsType {
    userRoles: string[];
    restrictTo: string[];
    restrictMessage: string;
    children: React.ReactNode;
}

export default function restrictAccess(props: PropsType) {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let allow = false;
        for (let i = 0; i < props.restrictTo.length; i++) {
            const restrictedRole = props.restrictTo[j];
            allow = props.userRoles.includes(restrictedRole);
            if (allow) {
                break;
            }
        }

        setDisplay(allow);
    }, []);

    return (
        <React.Fragment>
            {display ? (
                <React.Fragment>{props.children}</React.Fragment>
            ) : (
                <div className="page">
                    <h2>{props.restrictMessage}</h2>
                </div>
            )}
        </React.Fragment>
    );
}
