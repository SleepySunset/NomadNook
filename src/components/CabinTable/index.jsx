import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CabinTable.module.css";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ENDPOINTS } from "../../config/config";
import { useAuth } from "../../hooks/AuthContext";
import EditCabin from "../EditCabin";

const CabinTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [selectedCabinDelete, setSelectedCabinDelete] = useState(null);
  const [selectedCabinEdit, setSelectedCabinEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const END_POINT = ENDPOINTS.GET_ALL_CABINS;
  const END_POINT_DELETE = ENDPOINTS.DELETE_CABIN;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    axios(END_POINT).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [END_POINT]);

  const handleEdit = () => {
    if (!selectedCabinEdit) return;
    openModal();
  };

  const handleDelete = async () => {
    if (!selectedCabinDelete) return;

    try {
      await axios.delete(`${END_POINT_DELETE}/${selectedCabinDelete.id}`, {
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
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cabin) => (
            <tr key={cabin.id}>
              <td>{cabin.id}</td>
              <td>{cabin.titulo}</td>
              <td>{cabin.categorias.map((categoria) => categoria.nombre)}</td>
              <td>
                <span
                  onClick={() => {
                    setSelectedCabinEdit(cabin);
                    handleEdit();
                  }}
                  className={styles.actionBtn}
                >
                  <ModeEditOutlineOutlinedIcon sx={{ color: "#bc6c25" }} />
                </span>
                <span
                  onClick={() => setSelectedCabinDelete(cabin)}
                  className={styles.actionBtn}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "#bc6c25" }} />
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
