const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands,}) => {

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

      {equipments && employee ? (
        <div className="control">
          <label htmlFor="equipment">Equipment:</label>
          <select
            defaultValue={employee ? employee.equipment : null}
            name="equipment"
          >
            <option value={employee.equipment} key={employee.equipment}>
              {employee && equipments
                ? equipments.find(
                    (equipment) => equipment._id === employee.equipment
                  ).name
                : null}
            </option>
            {equipments
              ?.filter((eq) => eq._id !== employee.equipment)
              .map((equipment) => (
                <option value={equipment._id} key={equipment._id}>
                  {equipment.name}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="control">
          <label htmlFor="equipment">Equipment:</label>

          <select defaultValue="643867c5ce30b351e7d7cab1" name="equipment" >
            <option value="Select equipment" hidden>
              Select equipment
            </option>

            {equipments?.map((equipment) => (
              <option value={equipment._id} key={equipment._id}>
                {equipment.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {brands && employee ? (
        <div className="control">
          <label htmlFor="brand">Brand:</label>
          <select
            defaultValue={employee ? employee.brand : null}
            name="brand"
          >
            <option value={employee.brand} key={employee.brand}>
              {employee && brands
                ? brands.find(
                    (brand) => brand._id === employee.brand
                  ).name
                : null}
            </option>
            {brands
              ?.filter((eq) => eq._id !== employee.brand)
              .map((brand) => (
                <option value={brand._id} key={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="control">
          <label htmlFor="brand">Brand:</label>
          <select defaultValue="643867c5ce30b351e7d7ccd3" name="brand">
            <option value="Select brand" hidden>
              Select brand
            </option>
            {brands?.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
