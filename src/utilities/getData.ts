import { NavigateFunction } from "react-router-dom";
import statusRedirect from "./statusRedirect";

export default function getData(url: string, navigate: NavigateFunction) {
    return fetch(url, {
        method: "GET",
    })
        .then((response) => {
            console.log("STATUS: ", response.status);
            if (response.status >= 400) {
                statusRedirect(response.status, navigate);
            } else {
                return response.json();
            }
        })
        .catch((value) => {
            console.log("catch!", value);
        });
}
