import { NavigateFunction } from "react-router-dom";
import statusRedirect from "./statusRedirect";

export default function postForm(
    url = "/",
    data: FormData,
    navigate: NavigateFunction
) {
    return fetch(url, {
        method: "POST",
        body: data,
    })
        .then((response) => {
            console.log("STATUS: ", response.status);
            if (response.status >= 400) {
                statusRedirect(response.status, navigate);
            } else {
                return response.status;
            }
        })
        .catch((value) => {
            console.log("catch!", value);
        });
}
