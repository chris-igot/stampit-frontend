import React, { useRef, useState } from "react";

import StampListing from "./stampListing";

type StampClickFn = (stampId: string, updateStampList?: Function) => void;
interface PropsType {
    stampListRoute?: string;
    onClick?: StampClickFn;
}

export default function StampListContainer(props: PropsType) {
    // const [stamps, setStamps] = useState<ImageFileType[]>([]);
    const [stampSize, setStampSize] = useState(40);

    const [isExpanded, setIsExpanded] = useState(false);
    const listContainer = useRef<HTMLDivElement>(null);

    return (
        <div
            className="position--rel"
            ref={listContainer}
            onBlur={() => {
                console.log("blurred");
                setIsExpanded(false);
                // updateSize(false);
            }}
            onBlurCapture={() => {
                console.log("blurred2");
            }}
        >
            <div
                className="stamp-list"
                style={{
                    bottom: (isExpanded ? 0 : 0) * stampSize + "px",
                }}
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
                <StampListing expanded={isExpanded} {...setStampSize} />
            </div>
        </div>
    );
}
