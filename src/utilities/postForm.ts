interface OutputType<T> {
    status: number;
    value: T;
    error?: string;
}

export function postForm<T>(
    url = "/",
    formData: FormData,
    onSuccess?: (value: T) => void,
    returnsData = false,
    onFail?: (status: number) => void
) {
    return fetch(url, {
        method: "POST",
        body: formData,
    })
        .then(async (response) => {
            let dataOut: OutputType<T>;
            console.log({ response, onSuccess });
            if (response.status === 200) {
                if (returnsData) {
                    dataOut = await new Promise((resolve) => {
                        response.json().then((v: T) => {
                            console.log(v);
                            resolve({ status: response.status, value: v as T });
                        });
                    });
                    (onSuccess as (value: T) => void)(dataOut.value);
                } else {
                    dataOut = { status: response.status, value: {} as T };
                    (onSuccess as (value: T) => void)({} as T);
                }
            } else {
                if (onFail !== undefined) {
                    onFail(response.status);
                }

                dataOut = {
                    status: response.status,
                    value: {} as T,
                    error: response.statusText,
                };
            }

            return dataOut;
        })
        .catch((error) => {
            console.log(error);
        });
}
