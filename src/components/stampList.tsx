import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageFileType, OutputType } from "../ts_types/types";
import getData from "../utilities/getData";
import Image from "../components/image";

export default function StampList() {
    const navigate = useNavigate();
    const [stamps, setStamps] = useState<ImageFileType[]>([]);
    useEffect(() => {
        getData("/api/stamps/all", "json").then((output) => {
            const data = output as OutputType;
            switch (data.status) {
                case 200:
                    setStamps(data.json as ImageFileType[]);
                    break;
                default:
                    navigate("/login");
                    break;
            }
        });
        return () => {};
    }, []);

    return (
        <div className="stamp-list">
            {stamps.map((stamp) => (
                <Image
                    className="image__stamp-small"
                    key={stamp.fileName}
                    image={"/stamp/" + stamp.fileName}
                />
            ))}
        </div>
    );
}
