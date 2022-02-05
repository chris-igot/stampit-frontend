export default function convertInputToFormData(
    e: React.MouseEvent<HTMLButtonElement>
): FormData {
    const inputs = e.currentTarget.parentNode?.querySelectorAll(
        "input,textarea"
    ) as unknown as HTMLInputElement[];

    let data = new FormData();

    inputs.forEach((input) => {
        console.log(input.name, input.value);
        if (input.type === "file") {
            const fileList: FileList = input.files as FileList;

            if (input.hasAttribute("multiple")) {
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    data.append(input.name + "[]", file, file.name);
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
