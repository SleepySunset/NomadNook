import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./UserTable.module.css";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAuth } from "../../hooks/AuthContext";
import { ENDPOINTS } from "../../config/config";

const UserTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
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
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Correo</th>
          <th>Acciones</th>
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
            <td>{user.email}</td>
            <td>
              <span className={styles.editBtn}>
                <ModeEditOutlineOutlinedIcon sx={{ color: "#bc6c25" }} />
              </span>
              <span className={styles.deleteBtn}>
                <DeleteOutlineOutlinedIcon sx={{ color: "#bc6c25" }} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
