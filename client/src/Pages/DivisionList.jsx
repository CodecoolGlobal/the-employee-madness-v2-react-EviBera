import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import DivisionTable from "../Components/DivisionTable";

const fetchDivisions = () => {
  return fetch("/api/divisions").then((res) => res.json());
};

const deleteDivision = (id) => {
  return fetch(`/api/divisions/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const DivisionList = () => {
  const [loading, setLoading] = useState(true);
  const [divisions, setDivisions] = useState(null);

  const handleDelete = (id) => {
    deleteDivision(id);

    setDivisions((divisions) => {
      return divisions.filter((division) => division._id !== id);
    });
  };

  useEffect(() => {
    fetchDivisions()
      .then((divisions) => {
        setLoading(false);
        setDivisions(divisions);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <DivisionTable divisions={divisions} onDelete={handleDelete} />;
};

export default DivisionList;
