import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchSearch = (searchPhrase) => {
    return fetch(`/api/employees/search/${searchPhrase}`).then((res) => res.json());
};

 const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const EmployeeSearch = () => {
    
    const  searchPhrase = useParams();
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        fetchSearch(searchPhrase.search)
            .then((employees) => {
                setEmployees(employees);
                setLoading(false);
            })
    }, [searchPhrase]);

    if (loading) {
        return <Loading />;
    }

    return <EmployeeTable employees={employees} setEmployees={setEmployees} onDelete={handleDelete}/>;
};

export default EmployeeSearch;
