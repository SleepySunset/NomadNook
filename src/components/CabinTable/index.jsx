import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CabinTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINTS } from "../../config/config";
import { useAuth } from "../../hooks/AuthContext";
import EditCabin from "../EditCabin";

const CabinTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [selectedCabinDelete, setSelectedCabinDelete] = useState(null);
  const [selectedCabinEdit, setSelectedCabinEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const END_POINT_GET_CABINS = ENDPOINTS.GET_ALL_CABINS;
  const END_POINT_DELETE_CABIN = ENDPOINTS.DELETE_CABIN;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCabinEdit(null);
    setSelectedCabinDelete(null);
  };


  useEffect(() => {
    axios(END_POINT_GET_CABINS).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [END_POINT_GET_CABINS, selectedCabinEdit]);


  const handleDelete = async () => {
    if (!selectedCabinDelete) return;

    try {
      await axios.delete(`${END_POINT_DELETE_CABIN}/${selectedCabinDelete.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setData((prevData) =>
        prevData.filter((cabin) => cabin.id !== selectedCabinDelete.id)
      );
      setSelectedCabinDelete(null);
    } catch (error) {
      console.error("Error al eliminar la cabaña:", error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categorías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cabin) => (
            <tr key={cabin.id}>
              <td>{cabin.id}</td>
              <td>{cabin.titulo}</td>
              <td>{cabin.categorias.map((categoria) => categoria.nombre).join(", ")}</td>
              <td>
                <span
                  onClick={() => {
                    setSelectedCabinEdit(cabin);
                    openModal();
                  }}
                  className={styles.actionBtn}
                >
                  <FontAwesomeIcon icon="fa-solid fa-pen" style={{ color: "#bc6c25", fontSize: "larger"}} />
                </span>
                <span
                  onClick={() => setSelectedCabinDelete(cabin)}
                  className={styles.actionBtn}
                >
                  <FontAwesomeIcon icon="fa-solid fa-trash" style={{ color: "#bc6c25", fontSize: "larger" }} /> 
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCabinDelete && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p>
              ¿Estás seguro que quieres eliminar la cabaña{" "}
              <strong>&quot;{selectedCabinDelete.titulo}&quot;</strong>?
            </p>
            <div className={styles.modalBtnContainer}>
              <button className={styles.modalBtn} onClick={handleDelete}>
                Eliminar
              </button>
              <button
                className={styles.modalBtn}
                onClick={() => setSelectedCabinDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen ? <EditCabin id={selectedCabinEdit.id} onClose={closeModal}/> : null}
    </div>
  );
};

export default CabinTable;
