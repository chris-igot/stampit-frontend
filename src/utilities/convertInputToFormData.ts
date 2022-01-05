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
            data.append(input.name, (input.files as FileList)[0]);
        } else {
            data.append(input.name, input.value);
        }
    });
    return data;
}
