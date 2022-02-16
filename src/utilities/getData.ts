import processResponse from "./processResponse";

export default function getData<T>(
    url: string,
    returnType: "json" | "status" = "json"
) {
    return fetch(url, {
        method: "GET",
    }).then(processResponse<T>(returnType));
}
