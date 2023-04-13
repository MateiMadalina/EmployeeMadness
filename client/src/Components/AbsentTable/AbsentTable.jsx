import { Link } from "react-router-dom";
import "./AbsentTable.css";

const AbsentTable = ({ employees, onClick}) => (

  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Present</th>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          console.log(employee),
          <tr key={employee._id}>
            <td><input onClick={() => onClick(employee)} type="checkbox" defaultChecked={employee.present} /></td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AbsentTable;
