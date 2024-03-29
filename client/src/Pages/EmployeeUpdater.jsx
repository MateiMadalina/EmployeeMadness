import { useEffect, useState } from "react";
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

const fetchBrands = async () => {
  return fetch(`/api/brands/`).then((res) => res.json());
};

const fetchColors = async () => {
  return fetch(`/api/colors/`).then((res) => res.json());
}

const fetchEmployee = async (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};



const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [employee, setEmployee] = useState(null);
  const [equipments, setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setLoading(false);
      });
      fetchEquipments()
      .then((equipments) => {
        setEquipments(equipments);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
      fetchBrands()
      .then((brands) => {
        setBrands(brands);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
      fetchColors()
      .then((colors) => {
        setColors(colors);
        setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      equipments={equipments}
      brands={brands}
      colors={colors}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
