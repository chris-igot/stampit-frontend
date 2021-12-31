import React from "react";
import { StampType } from "../ts_types/types";

interface PropsType {
    stamp: StampType;
}

export default function Stamp(props: PropsType) {
    return (
        <div
            className="stamp"
            style={{
                left: `calc(${props.stamp.x / 100}% - 24px)`,
                top: `calc(${props.stamp.y / 100}% - 24px)`,
            }}
        >
            <img src={props.stamp.image} alt="" />
        </div>
    );
}
