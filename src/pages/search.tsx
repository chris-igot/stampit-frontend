import React, { useEffect, useState } from "react";
import InputText from "../components/form/textInput";
import ProfileList from "../components/profileList";
import { OutputType, ProfileType } from "../ts_types/types";
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
                className="flex flex--v-center bg--white rounded--15"
                action=""
            >
                <InputText name="search" type="text" />

                <button
                    className="btn-primary ml-1"
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
