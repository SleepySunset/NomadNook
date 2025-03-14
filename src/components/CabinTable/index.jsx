import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CabinTable.module.css";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ENDPOINTS } from "../../config/config";

const CabinTable = () => {
  const [data, setData] = useState([]);
  const END_POINT = ENDPOINTS.GET_ALL_CABINS;

  useEffect(() => {
    axios(END_POINT).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [END_POINT]);
  return (
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
            <td>{cabin.tipo}</td>
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

export default CabinTable;
