import React, { useEffect, useState } from "react";
import InputText from "../../components/form/textInput";
import ProfileList from "../../components/profileList";
import { OutputType, ProfileType } from "../../ts_types/types";
import postForm from "../../utilities/postForm";

export default function Search() {
    const [results, setResults] = useState<ProfileType[]>([]);
    useEffect(() => {}, []);

    function handleSearch() {
        const searchString = (
            document.getElementById("search") as HTMLInputElement
        ).value;
        let form = new FormData();
        form.append("search", searchString);
        postForm("/api/search", form, "json").then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    console.log(data.json);
                    setResults(data.json as ProfileType[]);
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <div className="page">
            <form className="search-form" action="">
                <InputText name="search" type="text" />

                <button
                    className="btn-blue"
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
