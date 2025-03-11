import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./UserTable.module.css";
import { useAuth } from "../../hooks/AuthContext";
import { ENDPOINTS } from "../../config/config";
import Swal from "sweetalert2";

const UserTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const END_POINT = ENDPOINTS.GET_ALL_USERS;

  useEffect(() => {
    axios
      .get(END_POINT, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [END_POINT, user]);

  const handleConfirm = () => {
    if (!selectedUser) return;

    const isCurrentlyAdmin = selectedUser.rol === "ADMIN"; // Verifica el rol actual
    const endpointUrl = isCurrentlyAdmin
      ? `${ENDPOINTS.REMOVE_ADMIN_ROLE}/${selectedUser.id}`
      : `${ENDPOINTS.ADD_ADMIN_ROLE}/${selectedUser.id}`;

    axios
      .put(endpointUrl, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((user) =>
            user.id === selectedUser.id
              ? { ...user, rol: isCurrentlyAdmin ? "CLIENTE" : "ADMIN" }
              : user
          )
        );
        setIsModalOpen(false);

        // Alerta para promoción a Admin
        
        if (!isCurrentlyAdmin) {
          Swal.fire({
            title: "Permisos de Admin otorgados",
            text: `El usuario ${selectedUser.nombre} ${selectedUser.apellido} ahora tiene permisos de Administrador.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "var(--color4)",
          });
        } 

        // Alerta para degradación a Cliente
        else {
          Swal.fire({
            title: "Permisos de Admin removidos",
            text: `El usuario ${selectedUser.nombre} ${selectedUser.apellido} ahora es Cliente.`,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "var(--color4)",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Permisos de Admin</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.nombre} {user.apellido}
              </td>
              <td>{user.rol}</td>
              <td>
                <button
                  className={styles.tableBtn}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  {user.rol === "ADMIN" ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedUser && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>
              {selectedUser.rol === "CLIENTE"
                ? `Esta acción otorgará permisos de administración al usuario ${selectedUser.nombre} ${selectedUser.apellido}`
                : `Esta acción retirará los permisos de administración al usuario ${selectedUser.nombre} ${selectedUser.apellido}`}
            </h3>
            <span className={styles.modalText}>¿Está seguro de esto?</span>
            <div className={styles.modalBtnContainer}>
              <button className={styles.modalBtn} onClick={handleConfirm}>
                Sí
              </button>
              <button
                className={styles.modalBtn}
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
