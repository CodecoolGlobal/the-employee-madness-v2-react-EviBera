import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [shouldDelete, setShouldDelete] = useState(false);

  const getConfirmation = () => {
    setShouldDelete(true)
    console.log("setSouldDelete function activated");
  }

  const handleDelete = (id) => {
    console.log("Del button clicked");
/*     deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
 */  };

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

  return <EmployeeTable employees={employees} onDelete={handleDelete} getConfirmation={getConfirmation} shouldDelete={shouldDelete} setShouldDelete={setShouldDelete}/>;
};

export default EmployeeList;
