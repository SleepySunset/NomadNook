import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CabinList.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminCabinList = () => {
  const [data, setData] = useState([])
  const END_POINT = 'https://nomadnook-nomadnook.up.railway.app/api/alojamientos/listarTodos';
  
  useEffect(()=>{
    axios(END_POINT).then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  },[])
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de cabañas registradas</h1>
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
          {data.map((cabin)=> (
            <tr key={cabin.id}>
              <td>{cabin.id}</td>
              <td>{cabin.titulo}</td>
              <td>{cabin.tipo}</td>
              <td><EditIcon/> <DeleteIcon/></td>
            </tr>
          ))}
        </tbody>
      </table>      
    </main>
  )
}

export default AdminCabinList
