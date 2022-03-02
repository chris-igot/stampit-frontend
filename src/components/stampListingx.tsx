/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import useAPIResource from "../hooks/useAPIResource";
import { ImageFileType } from "../ts_types/types";
import Image from "./image";

type StampClickFn = (stampId: string, updateStampList?: Function) => void;
type setStampSizeFn = (size: number) => void;
interface PropsType {
    expanded: boolean;
    stampListRoute?: string;
    onClick?: StampClickFn;
    setStampSize?: setStampSizeFn;
}

export default function StampListingx({ expanded, ...props }: PropsType) {
    const stampResource = useAPIResource<ImageFileType[]>(
        () => "/api/stamps/all",
        []
    );
    const [listDimensions, setListDimensions] = useState({
        width: 6,
        height: 6,
        stamp: 40,
    });
    const [listStyle, setListStyle] = useState<React.CSSProperties>({});
    const [selected, setSelected] = useState<number>(-1);
    const firstStamp = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        stampResource.refresh();
    }, []);

    useEffect(() => {
        updateSize();
    }, [stampResource.data]);

    useEffect(() => {
        updateSize();
    }, [expanded]);

    function updateSize() {
        if (stampResource.data.length === 0) {
            return;
        } else {
            const stampDim = firstStamp.current?.clientWidth as number;
            const listWidth = (listDimensions.width + 0.5) * stampDim;
            const listHeight =
                (expanded ? listDimensions.height : 1) * stampDim;
            console.log({ stampDim, listWidth, listHeight });
            setListDimensions({ ...listDimensions, stamp: stampDim });
            setListStyle({
                width: listWidth,
                height: listHeight,
            });

            if ("setStampSize" in props) {
                (props.setStampSize as setStampSizeFn)(stampDim);
            }
        }
    }

    return (
        <div className="stamp-list__scrollable" style={listStyle}>
            {stampResource.data.map((stamp, index) => (
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

                                stampResource.refresh
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
    );
}
