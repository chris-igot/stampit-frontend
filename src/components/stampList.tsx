import React, { useEffect, useRef, useState } from "react";
import { ImageFileType } from "../ts_types/types";
import getData from "../utilities/getData";
import Image from "../components/image";

type StampClickFn = (stampId: string, updateStampList?: Function) => void;
interface PropsType {
    stampListRoute?: string;
    onClick?: StampClickFn;
}

export default function StampList(props: PropsType) {
    const [stamps, setStamps] = useState<ImageFileType[]>([]);
    const [listDimensions, setListDimensions] = useState({
        width: 6,
        height: 6,
        stamp: 40,
    });
    const [listStyle, setListStyle] = useState<React.CSSProperties>({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [selected, setSelected] = useState<number>(-1);
    const firstStamp = useRef<HTMLAnchorElement>(null);
    const listContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        updateStampList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (stamps.length === 0) {
            return;
        } else {
            updateSize(isExpanded);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stamps]);

    function updateSize(expand: boolean) {
        const stampDim = firstStamp.current?.clientWidth as number;
        const listWidth = (listDimensions.width + 0.5) * stampDim;
        const listHeight = (expand ? listDimensions.height : 1) * stampDim;
        setListDimensions({ ...listDimensions, stamp: stampDim });
        setListStyle({
            width: listWidth,
            height: listHeight,
        });
        (listContainer.current as HTMLDivElement).style.width =
            listWidth + 4 * 2 + "px";
        (listContainer.current as HTMLDivElement).style.height =
            stampDim + 2 * 2 + 40 + "px";
    }

    function updateStampList() {
        let stampListRoute = "/api/stamps/all";

        if ("stampListRoute" in props) {
            stampListRoute = props.stampListRoute as string;
        }

        getData<ImageFileType[]>(stampListRoute, "json").then((output) => {
            switch (output.status) {
                case 200:
                    setStamps(output.json);
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <div
            className="position--rel"
            ref={listContainer}
            onBlur={() => {
                console.log("blurred");
                setIsExpanded(false);
                updateSize(false);
            }}
            onBlurCapture={() => {
                console.log("blurred2");
            }}
        >
            <div
                className="stamp-list"
                style={{
                    bottom: (isExpanded ? 0 : 0) * listDimensions.stamp + "px",
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
                            updateSize(newExpand);
                            listContainer.current?.focus();
                        }}
                    >
                        ^
                    </a>
                </div>
                <div className="stamp-list__scrollable" style={listStyle}>
                    {stamps.map((stamp, index) => (
                        <a
                            href="http://"
                            ref={index === 0 ? firstStamp : null}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={stamp.id}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(index);
                                if ("onClick" in props) {
                                    (props.onClick as StampClickFn)(
                                        stamp.id,
                                        updateStampList
                                    );
                                    console.log("clicked: " + stamp.id);
                                } else {
                                    console.log("_clicked: " + stamp.id);
                                }
                            }}
                        >
                            <Image
                                className={
                                    selected === index
                                        ? "image--stamp-listing selected"
                                        : "image--stamp-listing"
                                }
                                image={"/stamp/" + stamp.fileName}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
