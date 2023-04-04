import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useState, useEffect } from "react";

const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json())
};

const MissingEmployees = () => {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees()
          .then((employees) => {
            setLoading(false);
            setEmployees(employees);
          })
      }, []);
      
    const missingEmployees = employees.filter(employee => employee.present === false)

      if (loading) {
        return <Loading />;
      }

    return <EmployeeTable employees={missingEmployees} />

}

export default MissingEmployees