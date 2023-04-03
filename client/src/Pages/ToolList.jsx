import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ToolTable from "../Components/ToolTable"

const fetchTools = () => {
    return fetch("/api/tools/").then((res) => res.json());
}

const createTool = (tool) => {
    return fetch("/api/tools/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tool),
      }).then((res) => res.json());
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
    }, [tools]);

    const handleCreateTool = (tool) => {
        setLoading(true);
        createTool(tool)
        .then(() => {
            setLoading(false);
          })


    }

    if (loading) {
        return <Loading />;
      }

    return (<ToolTable tools={tools} onSave={handleCreateTool}/>)
}

export default ToolList