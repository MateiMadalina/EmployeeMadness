import {useState} from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands, colors}) => {

const [salary,setSalary] = useState(employee.salary);
const [newBookName,setNewBookName] = useState("");
const [newBookAuthor, setNewBookAuthor] = useState("");

let lvl =""

const handleSalary = (e) => {
  setSalary(e.target.value);
}

salary < 101 ? lvl = "Junior" : salary < 301 ? lvl = "Medior" : salary < 401 ? lvl = "Senior" : salary < 801 ? lvl ="Expert" : lvl = "GodLike"

const handleNewBookNameChange = (e) => {
  setNewBookName(e.target.value);
}

const handleNewBookAuthorChange = (e) => {
  setNewBookAuthor(e.target.value);
}

const newBook = {
  name : newBookName,
  author: newBookAuthor
}

  const updatedReadBooks = [...employee.readBooks, newBook];

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    if(newBookName !== "" && newBookAuthor !== "") employee.readBooks = updatedReadBooks;

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
      <label htmlFor="readBooks">List of books read:</label>
      <ol>
        {employee?.readBooks.map((book,index) => (
          <li key={index}>
            {book.name} <strong>by</strong> {book.author}
          </li>
        ))}
      </ol>
      </div>

      <div className="control">
        <label htmlFor="newBookName">New book name:</label>
        <input
          type="text"
          id="newBookName"
          name="newBookName"
          value={newBookName}
          onChange={handleNewBookNameChange}
        />
      </div>

      <div className="control">
        <label htmlFor="newBookAuthor">New book author:</label>
        <input
          type="text"
          id="newBookAuthor"
          name="newBookAuthor"
          value={newBookAuthor}
          onChange={handleNewBookAuthorChange}
        />
      </div>

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
          value={employee ? lvl : null}
          name="level"
          id="level"
          readOnly
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
          onChange={handleSalary}
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
