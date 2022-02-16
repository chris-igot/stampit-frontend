import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutputType } from "../ts_types/types";

type PathFunctionType = (path?: string) => string;

interface StatusResponseFunctions {
    [key: number]: (...args: any[]) => void;
}

export default function useAPIResource<T>(
    apiPath: PathFunctionType,
    fetchInit: RequestInit = { method: "GET" }
) {
    type OnDataUpdateFunctionType = (data: T) => void;
    const navigate = useNavigate();
    const [data, setData] = useState<T>();
    const onUpdateRef = useRef<OnDataUpdateFunctionType>(() => {});
    const responseFunctionsRef = useRef<StatusResponseFunctions>({});

    useEffect(() => {
        setResponseFunctions({
            401: () => {
                navigate("/login");
            },
            404: () => {
                navigate(-1);
            },
        });
    }, []);

    useEffect(() => {
        onUpdateRef.current(data as T);
    }, [data]);

    function setOnUpdate(onUpdate: OnDataUpdateFunctionType) {
        onUpdateRef.current = onUpdate;
    }

    function setResponseFunctions(responseFunctions: StatusResponseFunctions) {
        responseFunctionsRef.current = {
            ...responseFunctionsRef.current,
            ...responseFunctions,
        };
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

                    if (200 in responseFunctionsRef.current) {
                        responseFunctionsRef.current[200](response.statusText);
                    }
                } else {
                    if (response.status in responseFunctionsRef.current) {
                        responseFunctionsRef.current[response.status](
                            response.statusText
                        );
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

    return {
        data,
        refresh: updateData,
        onUpdate: setOnUpdate,
        setResponseFunctions,
    };
}
