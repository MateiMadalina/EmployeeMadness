import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import AbsentTable from "../Components/AbsentTable";

const fetchEmployees = async () => {
  return fetch("/api/absent").then((res) => res.json());
};



const AbsentList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  
  const updatePresent = async (employee) => {
    employee.present = employee.present ? false : true;
    setIsPresent(!isPresent)
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [isPresent]);

  if (loading) {
    return <Loading />;
  }

  return (
  <AbsentTable
   employees={employees}
   onClick={updatePresent}
   />
  );
};

export default AbsentList;
