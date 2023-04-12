import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = async (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipments = async () => {
  return fetch(`/api/equipments/`).then((res) => res.json());
};

const fetchEmployee = async (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  console.log(employee);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });
      fetchEquipments()
      .then((equipments) => {
        setEquipments(equipments);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      equipments={equipments}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
