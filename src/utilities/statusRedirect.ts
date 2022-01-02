import { NavigateFunction } from "react-router-dom";

export default function statusRedirect(
    status: number,
    navigate: NavigateFunction
) {
    switch (status) {
        case 401:
            navigate("/login");
            break;
        case 418:
            break;
        default:
            throw new Error("REQUEST ERROR:" + status);
    }
}
