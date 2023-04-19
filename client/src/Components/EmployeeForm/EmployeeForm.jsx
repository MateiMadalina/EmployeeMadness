const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands, colors}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    console.log(entries);
    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    console.log(employee);
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

 
        <div className="control">
          <label htmlFor="equipment">Equipment:</label>
          <select name="equipment">
            <option value="" selected="true" disabled="disabled">
                Select equipment
            </option>
            {equipments?.map((equip) => (
                <option
                   selected={employee?.equipment === equip._id}
                   value={equip._id} 
                   key={equip._id}
                >
                    {equip.name}
                </option>
              ))}
          </select>
        </div>

        <div className="control">
          <label htmlFor="brand">Brand:</label>
          <select name="brand">
            <option value="" selected="true" disabled="disabled">
                Select brand
            </option>
            {brands?.map((br) => (
                <option
                   selected={employee?.brand === br._id}
                   value={br._id} 
                   key={br._id}
                >
                    {br.name}
                </option>
              ))}
          </select>
        </div>

        <div className="control">
          <label htmlFor="color">Color:</label>
          <select name="color">
            <option value="" selected="true" disabled="disabled">
                Select color
            </option>
            {colors?.map((cl) => (
                <option
                   selected={employee?.color === cl._id}
                   value={cl._id} 
                   key={cl._id}
                >
                    {cl.name}
                </option>
              ))}
          </select>
        </div>



      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
