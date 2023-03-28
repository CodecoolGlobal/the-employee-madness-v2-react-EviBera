import { Link, useNavigate } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const EmployeeTable = ({ employees, onDelete }) => {

  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [rearranger, setRearranger] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')
  const [idToDelete, setIdToDelete] = useState(null)
  const [nameToDelete, setNameToDelete] = useState(null)
  const navigate = useNavigate()

  const handleClick = (event) => {
    //console.log(event.target.value);
    setRearranger(event.target.value);
  }

  const sortEmployees = (a, b) => {
    if (rearranger === "level") {
      if (a.level < b.level) {
        return -1
      }
      if (a.level > b.level) {
        return 1
      }
      return 0
    }

    if (rearranger === "position") {
      if (a.position < b.position) {
        return -1
      }
      if (a.position > b.position) {
        return 1
      }
      return 0
    }

    if (rearranger === "firstName") {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    }

    if (rearranger === "middleName") {
      let middleNameA = a.name.split(" ");
      middleNameA.pop();
      middleNameA.shift();

      let middleNameB = b.name.split(" ");
      middleNameB.pop();
      middleNameB.shift();

      if (middleNameA.length === 0) {
        return 1
      }
      if (middleNameB.length === 0) {
        return -1
      }

      if (middleNameA < middleNameB) {
        return -1
      }
      if (middleNameA > middleNameB) {
        return 1
      }
      return 0
    }

    if (rearranger === "lastName") {
      if (a.name.split(" ").pop() < b.name.split(" ").pop()) {
        return -1
      }
      if (a.name.split(" ").pop() > b.name.split(" ").pop()) {
        return 1
      }
      return 0
    }
  }

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/employees/${searchPhrase}`);
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
            <th>
              <form onSubmit={handleSearch}>
                <input placeholder="Search by name" onChange={(event) => setSearchPhrase(event.target.value)} />
              </form>
            </th>
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
            .sort(sortEmployees)
            .filter(employee => employee.level.toLowerCase().includes(level.toLowerCase()))
            .filter(employee => employee.position.toLowerCase().includes(position.toLowerCase()))
            .map((employee) => (
              <>
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => { setIdToDelete(employee._id); setNameToDelete(employee.name) }}>
                      Delete
                    </button>
                  </td>
                </tr>
                {employee._id === idToDelete ? (
                  <tr key={employee.name} className="delConfirm">
                    <td>Delete {nameToDelete}?</td>
                    <td></td>
                    <td><Link to={`/`}>
                      <button type="button" onClick={() => { setIdToDelete(null) }}>No!</button>
                    </Link>
                    </td>
                    <td>
                      <button type="button" onClick={() => { onDelete(idToDelete) }}>Sure</button>
                    </td>
                  </tr>) 
                  : (<></>)
                }
              </>
            ))}
        </tbody>
      </table>
    </div >
  );
}

export default EmployeeTable;
