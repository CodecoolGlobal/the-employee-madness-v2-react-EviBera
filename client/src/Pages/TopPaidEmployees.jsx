import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useEffect, useState } from "react";

const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json());
  };
  
  const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
  };

  const sortEmployeesBySalary = ( a, b) => {
    if (a.currentSalary < b.currentSalary) {
        return 1
      }
      if (a.currentSalary > b.currentSalary) {
        return - 1
      }
      return 0
  }
  
  const TopPaidEmployees = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
  
    const handleDelete = (id) => {
      deleteEmployee(id);
  
      setEmployees((employees) => {
        return employees.filter((employee) => employee._id !== id);
      });
    };
  
    useEffect(() => {
      fetchEmployees()
        .then((employees) => {
          setLoading(false);
          setEmployees(employees);
        })
    }, []);
  
    if (loading) {
      return <Loading />;
    }
  
    return <EmployeeTable employees={employees.sort(sortEmployeesBySalary).filter(employee => employees.indexOf(employee) < 3)} onDelete={handleDelete} />;
  };

export default TopPaidEmployees
