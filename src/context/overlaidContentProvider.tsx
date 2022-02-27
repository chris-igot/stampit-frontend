import React, { useState } from "react";
import Dialog from "../components/modalDialog";

interface PropsType {
    children?: React.ReactNode;
}

export interface OverlayDialogType {
    content: string;
    priority: number;
}

export interface OverlayFormType {
    content: JSX.Element;
    priority: number;
}

export interface OverlaysType {
    dialog: OverlayDialogType[];
    form: OverlayFormType[];
    [key: string]: OverlayDialogType[] | OverlayFormType[];
}

export type AddOverlayFnType = (
    type: string,
    text: string | JSX.Element,
    priority?: number
) => void;
export type RemoveOverlayFnType = (type: string, index: number) => void;

export interface OverlayContextType {
    [key: string]: AddOverlayFnType | RemoveOverlayFnType;
}

const overlayContext = React.createContext<OverlayContextType>({});

function OverlaidContentProvider(props: PropsType) {
    const [overlays, setOverlays] = useState<OverlaysType>({
        dialog: [],
        form: [],
    });

    function displayOverlay(type: string) {
        let output: JSX.Element[] = [];

        switch (type) {
            case "dialog":
                output = overlays["dialog"].map((overlay, index) => (
                    <Dialog
                        key={index}
                        index={index}
                        type={"dialog"}
                        message={overlay.content}
                        priority={overlay.priority}
                    />
                ));
                break;
            case "form":
                output = overlays["form"].map((overlay, index) => {
                    let element = overlay.content as JSX.Element;

                    return element;
                });
                break;
        }

        return output;
    }

    function addOverlay(
        type: string,
        content: string | JSX.Element,
        priority: number = -1
    ) {
        let newOverlays = { ...overlays };

        if (newOverlays[type] === undefined) {
            newOverlays[type] = [];
        }

        let newIndex = 0;
        switch (type) {
            case "dialog":
                newIndex =
                    newOverlays["dialog"].push({
                        content: content as string,
                        priority,
                    }) - 1;
                break;
            case "form":
                newIndex =
                    newOverlays["form"].push({
                        content: content as JSX.Element,
                        priority,
                    }) - 1;
                break;
            default:
                break;
        }
        setOverlays(newOverlays);

        return newIndex;
    }

    function removeOverlay(type: string, index: number) {
        let newOverlays = { ...overlays };
        const removed = newOverlays[type].splice(index, 1);

        setOverlays(newOverlays);
        return removed;
    }

    return (
        <overlayContext.Provider value={{ addOverlay, removeOverlay }}>
            {displayOverlay("dialog")}
            {displayOverlay("form")}
            {props.children}
        </overlayContext.Provider>
    );
}

export default OverlaidContentProvider;

export { overlayContext };
