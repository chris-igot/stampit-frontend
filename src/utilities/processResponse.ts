interface OutputType<T> {
    status: number;
    json: T;
    error?: string;
}

function processResponse<T = Object>(returnType: "status" | "json" = "status") {
    return function (response: Response): Promise<OutputType<T>> {
        let output: Promise<OutputType<T>>;
        if (response.status >= 400) {
            switch (response.status) {
                case 401:
                    break;
                case 403:
                    break;
                case 418:
                    break;
                default:
                    break;
            }
            output = new Promise<OutputType<T>>((resolve, reject) => {
                resolve({
                    status: response.status,
                    json: {} as T,
                    error: response.statusText,
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
