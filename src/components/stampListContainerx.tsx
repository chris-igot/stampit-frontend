import React, { useRef, useState } from "react";

import StampListingx from "./stampListingx";

type StampClickFn = (stampId: string, updateStampList?: Function) => void;
type onActivateFn = (activate: boolean) => void;
interface PropsType {
    stampListRoute?: string;
    onClick?: StampClickFn;
    onActivate?: onActivateFn;
}

export default function StampListContainerx(props: PropsType) {
    const [stampSize, setStampSize] = useState(40);
    const [isActivated, setIsActivated] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const listContainer = useRef<HTMLDivElement>(null);

    return (
        <div
            className={
                isActivated
                    ? "stamp-list__container"
                    : "stamp-list__container deactivated"
            }
            ref={listContainer}
            onBlur={() => {
                console.log("blurred");
                setIsExpanded(false);
            }}
            onBlurCapture={() => {
                console.log("blurred2");
            }}
        >
            {isActivated && (
                <div
                    className="stamp-list"
                    // style={{
                    //     bottom: (isExpanded ? 0 : 0) * stampSize + "px",
                    // }}
                >
                    <div>
                        <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                                isExpanded
                                    ? "open flex flex--h-center expanded"
                                    : "open flex flex--h-center"
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                const newExpand = !isExpanded;
                                setIsExpanded(newExpand);

                                listContainer.current?.focus();
                            }}
                        >
                            ^
                        </a>
                    </div>
                    <StampListingx expanded={isExpanded} {...setStampSize} />
                    {/* <div>
                        <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={"flex flex--h-center"}
                            onClick={(e) => {
                                e.preventDefault();
                                const newActivated = !isActivated;
                                setIsActivated(newActivated);
                                (props.onActivate as onActivateFn)(
                                    newActivated
                                );
                            }}
                        >
                            X
                        </a>
                    </div> */}
                </div>
            )}

            <div className={isActivated ? "activate activated" : "activate"}>
                <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"flex flex--h-center"}
                    onClick={(e) => {
                        e.preventDefault();
                        const newActivated = !isActivated;
                        setIsActivated(newActivated);
                        (props.onActivate as onActivateFn)(newActivated);
                    }}
                >
                    X
                </a>
            </div>
        </div>
    );
}
