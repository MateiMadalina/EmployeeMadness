import "./SearchTable.css";

const SearchTable = ({ employees}) => (
console.log(employees),
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
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
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SearchTable;
