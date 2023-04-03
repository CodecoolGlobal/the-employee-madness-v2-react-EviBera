import { useState } from "react";
import "./ToolTable.css"

const ToolTable = ({tools, onSave}) => {

    const [name, setName] = useState("");
    const [newTool, setNewTool] = useState("");
    const [newWeight, setNewWeight] = useState("");

    const createNewTool = (event) => {
        event.preventDefault();
        const toolToSave = {
            "name": newTool,
            "weight": newWeight
        }
        console.log(toolToSave);
        return onSave(toolToSave);
    }

    return (
        <div className="ToolTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
              </tr>
              <tr>
                <th>
                    <input placeholder="Search tools by name" onChange={(event) => setName(event.target.value)}></input>
                </th>
              </tr>
            </thead>
            <tbody>
              {tools
                .filter(tool => tool.name.toLowerCase().includes(name.toLowerCase()))
                .map((tool) => (
                  <tr key={tool._id}>
                    <td>{tool.name}</td>
                    <td>{tool.weight}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <form onSubmit={createNewTool}>
            Add a new tool:
            <input placeholder="name" onChange={(event) => setNewTool(event.target.value)}></input>
            <input placeholder="weight" onChange={(event) => setNewWeight(event.target.value)}></input>
            <button type="submit">Create</button>
          </form>
        </div >
      );
    
}

export default ToolTable