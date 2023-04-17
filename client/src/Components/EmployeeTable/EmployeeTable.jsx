import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onClick, onDelete, sort }) => (

  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Present</th>
          <th onClick={() => sort()}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Equipment</th>
          <th>Brand</th>
          <th>Favorite color</th>
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
