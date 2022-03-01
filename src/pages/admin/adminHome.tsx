import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StampNew from "../../components/form/stampNew";
import StampListContainer from "../../components/stampListContainer";
import StampListing from "../../components/stampListing";
import {
    AddOverlayFnType,
    overlayContext,
} from "../../context/overlaidContentProvider";

export default function AdminHome() {
    const { addOverlay } = useContext(overlayContext);
    const navigate = useNavigate();

    return (
        <div className="height--max">
            <div className="height--3rem flex flex--h-center flex--v-center bg--blue-7">
                <button
                    className="btn-secondary"
                    onClick={() => {
                        (addOverlay as AddOverlayFnType)("form", <StampNew />);
                    }}
                >
                    Add Stamps
                </button>
                <Link
                    className="btn-danger ml-4"
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

            <div className="height--25 flex flex--h-center flex--v-bottom">
                <StampListing expanded={true} />
            </div>
        </div>
    );
}
