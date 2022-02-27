import React, { useEffect, useState } from "react";
import InputText from "../components/form/textInput";
import ProfileList from "../components/profileList";
import { ProfileType } from "../ts_types/types";
import convertInputToFormData from "../utilities/convertInputToFormData";
import { postForm } from "../utilities/postForm";

export default function Search() {
    const [results, setResults] = useState<ProfileType[]>([]);
    useEffect(() => {}, []);

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

    return (
        <div className="page">
            <form
                className="width--max box-sizing--border flex flex--v-center flex--h-space-between mt-1 px-2 p--single-line-input-container bg--white rounded--max"
                action=""
                onSubmit={handleSearch}
            >
                <InputText name="search" type="text" />

                <button
                    className="btn-primary m--single-line-input"
                    type="submit"
                >
                    Search
                </button>
            </form>
            <ProfileList profiles={results} />
        </div>
    );
}
