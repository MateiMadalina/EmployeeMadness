import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipment = async () => {
  return fetch("/api/equipments/").then((res) => res.json());
};

const deleteEquipment = async (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [copyEquipments, setCopyEquipments] = useState(null);


  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((equipments) => {
      return equipments.filter((equip) => equip._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipment()
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments);
        setCopyEquipments(equipments);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return(
    <div>
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />
    </div>
  ); 
};

export default EquipmentList;
