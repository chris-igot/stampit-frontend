export default function convertInputToFormData(
    e: React.FormEvent<HTMLFormElement>
): FormData {
    const inputs = e.currentTarget.querySelectorAll(
        "input,textarea"
    ) as unknown as HTMLInputElement[];

    let data = new FormData();

    inputs.forEach((input) => {
        if (input.type === "file") {
            const fileList: FileList = input.files as FileList;

            if (input.hasAttribute("multiple")) {
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    data.append(input.name, file, file.name);
                }
            } else {
                data.append(input.name, fileList[0]);
            }
        } else {
            data.append(input.name, input.value);
        }
    });
    return data;
}
