import React, { useEffect, useState } from "react";
import InputText from "../components/form/textInput";
import ProfileList from "../components/profileList";
import { ProfileType } from "../ts_types/types";
import postForm from "../utilities/postForm";

export default function Search() {
    const [results, setResults] = useState<ProfileType[]>([]);
    useEffect(() => {}, []);

    function handleSearch() {
        const searchString = (
            document.getElementById("search") as HTMLInputElement
        ).value;
        let form = new FormData();
        form.append("search", searchString);
        postForm<ProfileType[]>("/api/profiles/search", form, "json").then(
            (output) => {
                switch (output.status) {
                    case 200:
                        setResults(output.json as ProfileType[]);
                        break;
                    default:
                        break;
                }
            }
        );
    }

    return (
        <div className="page">
            <form
                className="width--max box-sizing--border flex flex--v-center flex--h-space-between mt-1 px-2 p--single-line-input-container bg--white rounded--max"
                action=""
            >
                <InputText name="search" type="text" />

                <button
                    className="btn-primary m--single-line-input"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    Search
                </button>
            </form>
            <ProfileList profiles={results} updateFn={handleSearch} />
        </div>
    );
}
