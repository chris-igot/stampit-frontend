import React, { useContext, useEffect, useRef } from "react";
import {
    overlayContext,
    RemoveOverlayFnType,
} from "../context/overlaidContentProvider";

interface PropsType {
    index: number;
    type: string;
    message: string;
    priority: number;
}

export default function Dialog(props: PropsType) {
    const { removeOverlay } = useContext(overlayContext);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (dialogRef.current as HTMLDivElement).style.zIndex = (
            9500 + props.priority
        ).toString();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            {
                <div className="modal">
                    <div className="modal__dialog" ref={dialogRef}>
                        <p>{props.message}</p>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                (removeOverlay as RemoveOverlayFnType)(
                                    props.type,
                                    props.index
                                );
                            }}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}
