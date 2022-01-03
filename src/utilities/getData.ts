import processResponse from "./processResponse";

export default function getData(url: string) {
    return fetch(url, {
        method: "GET",
    })
        .then(processResponse("json"))
        .catch((error) => {
            console.log(error);
        });
}
