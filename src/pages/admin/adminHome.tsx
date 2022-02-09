import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StampNew from "../../components/form/stampNew";
import StampList from "../../components/stampList";
import getData from "../../utilities/getData";

export default function AdminHome() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     getData("/css/getuser").then((output) => {
    //         console.log(output);
    //     });

    //     return () => {};
    // }, []);

    return (
        <div className="page">
            <div>
                <Link
                    className="navigation__link"
                    to="/admin/login"
                    onClick={() => {
                        fetch("/api/logout").then(() => {
                            navigate("/admin/login");
                        });
                    }}
                >
                    logout
                </Link>
            </div>
            <StampNew />

            <div>
                <StampList />
            </div>
        </div>
    );
}
