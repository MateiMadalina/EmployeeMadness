import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onClick, onDelete, sort, sortRef }) => (

  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Present</th>
          <th onClick={() => sort("name")}>Name</th>
          <th onClick={() => sort("level")}>Level</th>
          <th onClick={() => sort("position")}>Position</th>
          <th onClick={() => sortRef("equipment")}>Equipment</th>
          <th onClick={() => sortRef("brand")}>Brand</th>
          <th onClick={() => sortRef("color")}>Favorite color</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td><input onClick={() => onClick(employee)} type="checkbox" defaultChecked={employee.present} /></td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.equipment.name}</td>
            <td>{employee.brand.name}</td>
            <td>{employee.color.name}</td>
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
  </div>
);

export default EmployeeTable;
