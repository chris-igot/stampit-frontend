import React, { useRef, useState } from "react";
import { ImageFileType } from "../ts_types/types";
import Image from "./image";

type StampClickFn = (stampId: string) => void;

interface PropsType {
    stampList: ImageFileType[];
    className?: string;
    onClick?: StampClickFn;
}

export default function StampListing({ stampList, ...props }: PropsType) {
    const firstStamp = useRef<HTMLSpanElement>(null);
    const [selected, setSelected] = useState<number>(-1);

    return (
        <div
            className={
                "className" in props
                    ? props.className
                    : "stamp-list__scrollable"
            }
        >
            {stampList.map((stamp, index) => (
                <span
                    ref={index === 0 ? firstStamp : null}
                    key={stamp.id}
                    onClick={(e) => {
                        e.preventDefault();
                        setSelected(index);
                        if ("onClick" in props) {
                            (props.onClick as StampClickFn)(stamp.id);
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
                </span>
            ))}
        </div>
    );
}
