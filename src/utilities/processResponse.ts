import { OutputType } from "../ts_types/types";

function processResponse<T = Object>(returnType: "status" | "json" = "status") {
    return function (response: Response): Promise<OutputType<T>> {
        // console.trace("response", response.url);
        let output: Promise<OutputType<T>>;
        if (response.status >= 400) {
            console.log(response);
            console.log(response.json);
            switch (response.status) {
                case 401:
                    break;
                case 403:
                    break;
                case 418:
                    break;
                default:
                    break;
                // throw new Error(
                //     response.status + ": " + response.statusText
                // );
            }
            output = new Promise<OutputType<T>>((resolve, reject) => {
                response.json().then((value) => {
                    resolve({
                        status: response.status,
                        json: value as T,
                        error: response.statusText,
                    });
                });
            });
        } else {
            switch (returnType) {
                case "status":
                    output = new Promise<OutputType<T>>((resolve, reject) => {
                        resolve({
                            status: response.status,
                            json: {} as T,
                        });
                    });
                    break;
                case "json":
                    output = new Promise<OutputType<T>>((resolve, reject) => {
                        response.json().then((value: T) => {
                            resolve({
                                status: response.status,
                                json: (value !== null ? value : {}) as T,
                            });
                        });
                    });
                    break;
                default:
                    output = new Promise<OutputType<T>>((resolve, reject) => {
                        resolve({
                            status: response.status,
                            json: {} as T,
                        });
                    });
                    break;
            }
        }

        return output.catch((error) => {
            console.log(error);

            return new Promise<OutputType<T>>((resolve, reject) => {
                resolve({
                    status: response.status,
                    json: {} as T,
                    error: response.statusText,
                });
            });
        });
    };
}

export default processResponse;
