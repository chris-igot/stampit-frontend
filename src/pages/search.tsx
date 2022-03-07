import React, { useRef, useState } from "react";
import InputText from "../components/form/textInput";
import ProfileList from "../components/profileList";
import { ProfileType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import { postForm } from "../utilities/postForm";

export default function Search() {
    const [results, setResults] = useState<ProfileType[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        postForm<ProfileType[]>(
            "/api/profiles/search",
            convertInputToFormData(e),
            (output) => {
                setResults(output);
            },
            true
        );
    }

    function resubmitSearch() {
        (formRef.current as HTMLFormElement).requestSubmit();
    }

    return (
        <div className="page">
            <form
                className="width--max box-sizing--border flex flex--v-center flex--h-space-between mt-1 px-2 p--single-line-input-container bg--white rounded--max"
                action=""
                onSubmit={handleSearch}
                ref={formRef}
            >
                <InputText
                    name="search"
                    type="text"
                    width="100%"
                    label="profile search"
                />
            </form>

            <ProfileList profiles={results} updateFn={resubmitSearch} />
        </div>
    );
}
