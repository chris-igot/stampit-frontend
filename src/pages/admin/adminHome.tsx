/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StampNew from "../../components/form/stampNew";
import StampListing from "../../components/stampListing";
import StampListingx from "../../components/stampListingx";
import {
    AddOverlayFnType,
    overlayContext,
} from "../../context/overlaidContentProvider";
import useAPIResource from "../../hooks/useAPIResource";
import { ImageFileType } from "../../ts_types/types";

export default function AdminHome() {
    const { addOverlay } = useContext(overlayContext);
    const stampResource = useAPIResource<ImageFileType[]>(
        () => "/api/stamps/all",
        []
    );
    const navigate = useNavigate();

    useEffect(() => {
        stampResource.refresh();
    }, []);

    return (
        <div className="height--max">
            <div className="height--3rem flex flex--h-center flex--v-center bg--blue-7">
                <button
                    className="btn-secondary"
                    onClick={() => {
                        (addOverlay as AddOverlayFnType)(
                            "form",
                            <StampNew onSuccess={stampResource.refresh} />
                        );
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

            <div className="height--25 flex flex--h-center flex--v-bottom px-2 ">
                <StampListing stampList={stampResource.data} />
            </div>
        </div>
    );
}
