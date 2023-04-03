import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DivisionForm from "../Components/DivisionForm";



const DivisionCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [newDivision, setNewDivision] = useState({});

    const createDivision = (division) => {
        return fetch("/api/divisions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(division),
        })
            .then((res) => res.json())
            .then(data => setNewDivision(data))
    };

    console.log(newDivision._id);

    const handleBossUpdate = (boss) => {
        if (newDivision) {
            boss = {
                ...boss,
                division: newDivision._id
            };
            console.log("in fetch: " + newDivision._id);
        
            fetch(`/api/employees/${boss._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(boss),
            }).then((res) => res.json())
            .then((data) => console.log(data));

        }
    }


    const handleCreateDivision = (division) => {
        setLoading(true);

        createDivision(division)
            .then(() => {
                setLoading(false);
                navigate("/divisions");
            });

    };

    const wrapperFunction = (division, boss) => {
        handleCreateDivision(division);
        handleBossUpdate(boss)
    }

    return (
        <DivisionForm
            onCancel={() => navigate("/divisions")}
            disabled={loading}
            onSave={wrapperFunction}
        />
    );
};

export default DivisionCreator;
