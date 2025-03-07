import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./UserTable.module.css";
import { useAuth } from "../../hooks/AuthContext";
import { ENDPOINTS } from "../../config/config";

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
        console.log(res.data);
      });
  }, [END_POINT, user]);

  const handleConfirm = () => {
    if (!selectedUser) return;
    const endpointUrl =
      selectedUser.rol === "ADMIN"
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
              ? { ...user, rol: user.rol === "ADMIN" ? "CLIENTE" : "ADMIN" }
              : user
          )
        );
        setIsModalOpen(false);
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
