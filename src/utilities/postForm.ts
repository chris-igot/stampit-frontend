import { OutputType } from "../ts_types/types";
import processResponse from "./processResponse";

export default function postForm<T>(
    url = "/",
    data: FormData,
    returnType: "json" | "status" = "status"
) {
    return fetch(url, {
        method: "POST",
        body: data,
    }).then(processResponse<T>(returnType));
}
