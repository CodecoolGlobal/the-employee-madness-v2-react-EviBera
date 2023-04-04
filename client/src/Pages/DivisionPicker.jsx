import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"

const DivisionPicker = () => {

    const [employee, setEmployee] = useState({});
    const [divisions, setDivisions] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
    
    }, [ id ])

    useEffect(() => {
      fetch("/api/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(data))
    
    }, [])
    
    const handleDivisionSelection = (event) => {
        setEmployee(employee.division = event.target.value);

        fetch(`/api/employees/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          }).then((res) => res.json())

        navigate("/")
                   
    }

    return (
    <div>
        Select a division for {employee.name}!
        <br></br>
        <select onClick={handleDivisionSelection}>
            <option value=""></option>
            {divisions.map(division => <option key={division._id} value={division._id}>{division.name}</option>)}
        </select>
    </div>
    )
}

export default DivisionPicker