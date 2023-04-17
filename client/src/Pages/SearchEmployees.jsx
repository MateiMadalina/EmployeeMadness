import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import SearchTable from "../Components/SearchTable/SearchTable";

const fetchEmployees = async (name) => {
    return fetch(`/employees/${name}`).then((res) => res.json());
};

const EmployeeList = () => {
  const {name} = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetchEmployees(name)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [name]);

  if (loading) {
    return <Loading />;
  }
  
  return(
    <div>
      <SearchTable
       employees={employees}
      />
    </div>
  ); 
};

export default EmployeeList;
