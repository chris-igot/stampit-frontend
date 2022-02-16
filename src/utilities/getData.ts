import processResponse from "./processResponse";

export default function getData(
    url: string,
    returnType: "json" | "status" = "json"
) {
    return fetch(url, {
        method: "GET",
    })
        .then(processResponse(returnType))
        .catch((error) => {
            console.log(error);
        });
}
