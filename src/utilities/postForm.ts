import processResponse from "./processResponse";

export default function postForm(url = "/", data: FormData) {
    return fetch(url, {
        method: "POST",
        body: data,
    })
        .then(processResponse())
        .catch((error) => {
            console.log(error);
        });
}
