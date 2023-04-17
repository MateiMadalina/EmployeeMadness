import "./SearchTable.css";

const SearchTable = ({ employees}) => (
  <div className="SearchTable">
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
