import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = async (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};


const updatePresent = async (employee) => {
  employee.present = employee.present ? false : true;
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [inputText, setInputText] = useState("");
  const [copyEmployees, setCopyEmployees] = useState(null);
  const [page, setPage] = useState(1);
  const [index,setIndex] =useState(0);

  const incrementPage = () => {
    if (page * 10 >= employees.length) return;
    setPage(page + 1);
  };

  const decrementingPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };



  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setCopyEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  const searchEmployee = (e) => {
    setInputText(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filteredEmployees = copyEmployees.filter((empl) =>
      empl.level.toLowerCase().includes(searchTerm) ||
      empl.position.toLowerCase().includes(searchTerm) ||
      empl.name.toLowerCase().includes(searchTerm)
    );
    setEmployees(filteredEmployees);
  };

  const filteredSelect = (e) => {
    const option = e.target.value;
    if (option === "Level") {
      setEmployees(previous => [...previous].sort((a, b) => a.level.localeCompare(b.level)));
    } else if (option === "Position") {
      setEmployees(previous => [...previous].sort((a, b) => a.position.localeCompare(b.position)));
    } else if (option === "First name") {
      setEmployees(previous => [...previous].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (option === "Last name") {
      setEmployees(previous => [...previous].sort((a, b) => {
        const aLast = a.name.split(" ")[a.name.split(" ").length - 1];
        const bLast = b.name.split(" ")[b.name.split(" ").length - 1];
        return aLast.localeCompare(bLast);
      }));
    } else if (option === "Middle name") {
      setEmployees(previous => [...previous].sort((a, b) => {
        const aMiddle = a.name.split(" ")[a.name.split(" ").length > 2 ? 1 : 0];
        const bMiddle = b.name.split(" ")[b.name.split(" ").length > 2 ? 1 : 0];
        return aMiddle.localeCompare(bMiddle);
      }));
    }
  }

 
  const sortByName = () => {
   if(index % 2 === 0 ){
    setIndex(index + 1);
    setEmployees((previous) =>
    [...previous].sort((a, b) => a.name.localeCompare(b.name)))
   } else {
    setIndex(index + 1);
     setEmployees((previous) =>
     [...previous].sort((a, b) => b.name.localeCompare(a.name)))
   }
  }
  
  return(
    <div>
      <div className="div-search">
        <select onChange={filteredSelect}>
          <option disabled selected>Arrange them accordingly</option>
          <option>First name</option>
          <option>Last name</option>
          <option>Middle name</option>
          <option>Level</option>
          <option>Position</option>
        </select>
        <input
        type="text" 
        placeholder="Search by Level/Position"
        value={inputText}
        onChange={searchEmployee}
        />
      </div> 
      <EmployeeTable
        employees={employees.slice((page - 1) * 10, page * 10)}
        onClick={updatePresent}
        sort={sortByName}
        onDelete={handleDelete}
      />
      <div className="pagination-btns">
        <button onClick={decrementingPage} className="btns-prev">Prev</button>
        <p>{page}</p>
        <button onClick={incrementPage} className="btns-prev">Next</button>
      </div>
    </div>
  ); 
};

export default EmployeeList;
