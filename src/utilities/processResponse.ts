import { OutputType } from "../ts_types/types";

export default function processResponse(
    returnType: "json" | "status" = "status"
): (response: Response) => Promise<OutputType> {
    return function (response: Response): Promise<OutputType> {
        if (response.status >= 400) {
            switch (response.status) {
                case 401:
                    break;
                case 418:
                    break;
                default:
                    throw new Error(
                        response.status + ": " + response.statusText
                    );
            }
            let output = new Promise<OutputType>((resolve, reject) => {
                resolve({
                    status: response.status,
                    error: response.statusText,
                });
            });
            return output;
        } else {
            let output: Promise<OutputType>;
            switch (returnType) {
                case "json":
                    output = new Promise<OutputType>((resolve, reject) => {
                        response.json().then((value) => {
                            resolve({
                                status: response.status,
                                json: value,
                            });
                        });
                    });
                    return output;
                case "status":
                    output = new Promise<OutputType>((resolve, reject) => {
                        resolve({
                            status: response.status,
                        });
                    });
                    return output;
                default:
                    output = new Promise<OutputType>((resolve, reject) => {
                        resolve({
                            status: response.status,
                        });
                    });
                    return output;
            }
        }
    };
}
