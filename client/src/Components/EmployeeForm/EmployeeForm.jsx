const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  equipments,
  brands,
}) => {
console.log(brands);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    const equipSelect = e.target.elements.equipments;
    const equipOption = equipSelect.options[equipSelect.selectedIndex];
    const equipValue = equipOption.value;
    employee.equipment = equipValue;

    const brandSelect = e.target.elements.brands;
    const brandOption = brandSelect.options[brandSelect.selectedIndex];
    const brandValue = brandOption.value;
    employee.brand = brandValue;

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
          <label htmlFor="position">Equipment:</label>
          <select
            defaultValue={employee ? employee.equipment : null}
            name="equipments"
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
          <label htmlFor="position">Equipment:</label>

          <select name="equipments">
            <option value="Select an equipment" hidden>
              Select an equipment
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
          <label htmlFor="position">Brand:</label>
          <select
            defaultValue={employee ? employee.brand : null}
            name="brands"
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
          <label htmlFor="position">Brand:</label>
          <select name="brands">
            <option value="Select an brand" hidden>
              Select an brand
            </option>
            {brands?.map((brand) => (
              console.log(brand),
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
