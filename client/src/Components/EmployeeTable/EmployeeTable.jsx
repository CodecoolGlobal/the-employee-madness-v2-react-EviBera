import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const EmployeeTable = ({ employees, onDelete }) => {

  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [rearranger, setRearranger] = useState('');

  const handleClick = (event) => {
    console.log(event.target.value);
    setRearranger(event.target.value);
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Rearrange employees by</th>
          </tr>
          <tr>
            <th></th>
            <th><input placeholder="Search by level" onChange={(event) => setLevel(event.target.value)} /></th>
            <th><input placeholder="Search by position" onChange={(event) => setPosition(event.target.value)} /></th>
            <th>
              <form onClick={handleClick}>
                <select name="arrangeOptions" id="arrangeOptions">
                  <option value="firstName">First name</option>
                  <option value="middleName">Middle name</option>
                  <option value="lastName">Last name</option>
                  <option value="position">Position</option>
                  <option value="level">Level</option>
                </select>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter(employee => employee.level.toLowerCase().includes(level.toLowerCase()))
            .filter(employee => employee.position.toLowerCase().includes(position.toLowerCase()))
            .map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
}

export default EmployeeTable;
