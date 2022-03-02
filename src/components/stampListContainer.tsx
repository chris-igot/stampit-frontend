/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Arrow from "../cssicons/arrow";
import Cross from "../cssicons/cross";
import useAPIResource from "../hooks/useAPIResource";
import { ImageFileType } from "../ts_types/types";
import StampListing from "./stampListing";

type StampClickFn = (stampId: string) => void;
type CaptureActivationFn = (isActivated: boolean) => void;

interface PropsType {
    onClick?: StampClickFn;
    captureActivation?: CaptureActivationFn;
}

export default function StampListContainer(props: PropsType) {
    const stampResource = useAPIResource<ImageFileType[]>(
        () => "/api/stamps/all",
        []
    );
    const [isActivated, setIsActivated] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const listContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        stampResource.refresh();
    }, []);

    useEffect(() => {
        updateSize();
        if ("captureActivation" in props) {
            (props.captureActivation as CaptureActivationFn)(isActivated);
        }
    }, [isActivated, isExpanded]);

    function updateSize() {
        if (isActivated) {
            (listContainerRef.current as HTMLDivElement).style.width = "100%";
            if (isExpanded) {
                (listContainerRef.current as HTMLDivElement).style.height =
                    "10rem";
            } else {
                (listContainerRef.current as HTMLDivElement).style.height =
                    "5rem";
            }
        } else {
            (listContainerRef.current as HTMLDivElement).style.width = "50px";
            (listContainerRef.current as HTMLDivElement).style.height = "50px";
        }
    }

    return (
        <div className="stamp-list__container mt-1" ref={listContainerRef}>
            <div className="flex flex--h-center flex--v-center pr-1">
                <Cross
                    className={isActivated ? "rotate-45" : ""}
                    onClick={() => {
                        setIsActivated(!isActivated);
                        if (!isActivated) {
                            setIsExpanded(false);
                        }
                    }}
                />
            </div>
            {isActivated && (
                <StampListing
                    stampList={stampResource.data}
                    onClick={props.onClick || undefined}
                />
            )}

            {isActivated && (
                <div className="flex flex--h-center flex--v-center pl-1">
                    <Arrow
                        direction={isExpanded ? "up" : "down"}
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
