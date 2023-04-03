import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ToolTable from "../Components/ToolTable"

const fetchTools = () => {
    return fetch("/api/tools/").then((res) => res.json());
}

const ToolList = () => {

    const [loading, setLoading] = useState(true);
    const [tools, setTools] = useState(null);

    useEffect(() => {
        fetchTools()
            .then((tools) => {
                setLoading(false);
                setTools(tools);
            })
    }, []);

    if (loading) {
        return <Loading />;
      }

    return (<ToolTable tools={tools}/>)
}

export default ToolList