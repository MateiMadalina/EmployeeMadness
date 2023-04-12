import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";

const updateEquipment = async (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = async (id) => {
  return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setEquipments(equipment);
        setEquipmentLoading(false);
      });
  }, [id]);

  const handleUpdatEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
      .then(() => {
        setUpdateLoading(false);
        navigate("/equipment");
      });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipments}
      onSave={handleUpdatEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/equipment")}
    />
  );
};

export default EquipmentUpdater;
