import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({ equipments, onDelete }) => (

  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipments.map((equip) => (
          <tr key={equip._id}>
            <td>{equip.name}</td>
            <td>{equip.type}</td>
            <td>{equip.amount}</td>
            <td>
              <Link to={`/equipment/update/${equip._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equip._id)}>
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
