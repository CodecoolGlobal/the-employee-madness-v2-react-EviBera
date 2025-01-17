import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DivisionForm from "../Components/DivisionForm";


const DivisionCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [newDivision, setNewDivision] = useState(null)

    const createDivision = (division) => {
        return fetch("/api/divisions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(division),
        }).then((res) => res.json())
            .then((data) => setNewDivision(data));
    };


    const assaignBoss = async () => {
        let boss = await newDivision.boss;
        boss.division = newDivision._id;

        return fetch(`/api/employees/${boss._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boss)
        }).then((res) => res.JSON())
    }


    const handleCreateDivision = (division) => {
        setLoading(true);

        createDivision(division);
        assaignBoss()
            .then(() => {
                setLoading(false);
                navigate("/divisions");
            })
    };

    return (
        <DivisionForm
            onCancel={() => navigate("/divisions")}
            disabled={loading}
            onSave={handleCreateDivision}
        />
    );
};

export default DivisionCreator;