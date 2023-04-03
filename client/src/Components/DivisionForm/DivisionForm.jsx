import { useEffect, useState } from "react";

const DivisionForm = ({ onSave, disabled, division, onCancel }) => {

  const [name, setName] = useState(division ? division.name : '');
  const [boss, setBoss] = useState(division ? division.boss : undefined);
  const [budget, setBudget] = useState(division ? division.budget : '');
  const [city, setCity] = useState(division ? division.location.city : '');
  const [country, setCountry] = useState(division ? division.location.country : '');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/employees/")
    .then(res => res.json())
    .then(data => setEmployees(data))
  }, [])


    const onSubmit = (e) => {
      e.preventDefault();
      const divisionToSave = {
        name,
        boss: employees.find(employee => employee._id === boss),
        budget,
        location: {
          city,
          country
        }
      }

      if (division) {
        divisionToSave._id = division._id
      }

      return onSave(divisionToSave);
    };

    return (
      <form className="DivisionForm" onSubmit={onSubmit}>
        {division && (
          <input type="hidden" name="_id" defaultValue={division._id} />
        )}

        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={division ? division.name : null}
            onChange={(event) => setName(event.target.value)}
            name="name"
            id="name"
          />
        </div>

        <div className="control">
          <label htmlFor="boss">Boss:</label>
          <select
            onChange={(event) => setBoss(event.target.value)}
            name="boss"
            id="boss">
              <option value=""></option>
              {employees.map(employee => <option selected={division && division.boss._id === employee._id} value={employee._id} key={employee._id}>{employee.name}</option>)}
          </select>
        </div>

        <div className="control">
          <label htmlFor="budget">Budget:</label>
          <input
            defaultValue={division ? division.budget : null}
            onChange={(event) => setBudget(event.target.value)}
            name="budget"
            id="budget"
          />
        </div>

        <div className="control">
          <label htmlFor="city">City:</label>
          <input
            defaultValue={division ? division.location.city : null}
            onChange={(event) => setCity(event.target.value)}
            name="city"
            id="city"
          />
        </div>

        <div className="control">
          <label htmlFor="country">Country:</label>
          <input
            defaultValue={division ? division.location.country : null}
            onChange={(event) => setCountry(event.target.value)}
            name="country"
            id="country"
          />
        </div>

        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {division ? "Update Division" : "Create Division"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  };

  export default DivisionForm;