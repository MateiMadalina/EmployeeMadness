import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = async (employee) => {
  return fetch("/api/employees", {
    method: "POST",
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

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipments,setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    fetchEquipments()
    .then((equipments) => {
      setEquipments(equipments);
    })
    .catch((error) => {
      throw error;
    });
    fetchBrands()
    .then((brands) => {
      setBrands(brands);
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
  },[])

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipments={equipments}
      brands={brands}
      colors={colors}
    />
  );
};

export default EmployeeCreator;
