import { useEffect, useRef, useState } from "react";
import { OutputType } from "../ts_types/types";

type PathFunctionType = (path?: string) => string;

interface StatusResponseFunctions {
    [key: number]: (...args: any[]) => void;
}

export default function useAPIResource<T>(
    apiPath: PathFunctionType,
    responseFunctions: StatusResponseFunctions = {},
    fetchInit: RequestInit = { method: "GET" }
) {
    type OnDataUpdateFunctionType = (data: T) => void;

    const [data, setData] = useState<T>();
    const onUpdateRef = useRef<OnDataUpdateFunctionType>(() => {});

    useEffect(() => {
        onUpdateRef.current(data as T);
    }, [data]);

    function setOnUpdate(onUpdate: OnDataUpdateFunctionType) {
        onUpdateRef.current = onUpdate;
    }

    function updateData(pathArg: string = "") {
        fetch(apiPath(pathArg), fetchInit)
            .then((response): Promise<OutputType<T>> => {
                let output: Promise<OutputType<T>>;
                if (response.status === 200) {
                    output = new Promise<OutputType<T>>((resolve, reject) => {
                        response.json().then((value: T) => {
                            resolve({
                                status: response.status,
                                json: value,
                            });
                        });
                    });

                    if (200 in responseFunctions) {
                        responseFunctions[200](response.statusText);
                    }
                } else {
                    if (response.status in responseFunctions) {
                        responseFunctions[response.status](response.statusText);
                    }

                    throw new Error(
                        response.status + ": " + response.statusText
                    );
                }

                return output;
            })
            .then((output) => {
                setData(output.json);
            })
            .catch((statusText) => {
                console.error(statusText);
            });
    }

    return { data, refresh: updateData, onUpdate: setOnUpdate };
}
