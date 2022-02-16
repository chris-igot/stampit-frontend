import processResponse from "./processResponse";

export default function postForm(
    url = "/",
    data: FormData,
    returnType: "json" | "status" = "status"
) {
    return fetch(url, {
        method: "POST",
        body: data,
    })
        .then(processResponse(returnType))
        .catch((error) => {
            console.log(error);
        });
}
