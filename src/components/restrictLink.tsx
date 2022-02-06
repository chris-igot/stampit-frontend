import React, { useState, useEffect } from "react";
import { Link, LinkProps } from "react-router-dom";

interface PropsType extends LinkProps {
    userRoles: string[];
    restrictTo: string[];
    restrictMessage: string;
}

export default function RestrictLink({
    userRoles,
    restrictTo,
    restrictMessage,
    children,
    to,
    ...props
}: LinkProps) {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let allow = false;
        for (let i = 0; i < restrictTo.length; i++) {
            const restrictedRole = restrictTo[j];
            allow = userRoles.includes(restrictedRole);
            if (allow) {
                break;
            }
        }

        setDisplay(allow);
    }, []);

    return (
        <React.Fragment>
            {display ? (
                <Link to={to} {...props}>
                    {children}
                </Link>
            ) : (
                ""
            )}
        </React.Fragment>
    );
}
