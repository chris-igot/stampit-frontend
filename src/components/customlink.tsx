import React from "react";
import { Link, LinkProps } from "react-router-dom";

export default function CustomLink({ children, to, ...props }: LinkProps) {
    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    );
}
