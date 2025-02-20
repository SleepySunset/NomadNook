import axios from "axios";
import { useState } from "react";
import styles from "./AddCabin.module.css";

const AddCabin = ({ onClose }) => {
  const END_POINT =
    "https://nomadnook-nomadnook.up.railway.app/api/alojamientos/guardar";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios({
        method: "post",
        url: END_POINT,
        data: {
          titulo: title,
          descripcion: description,
          tipo: type,
          capacity: capacity,
          precioPorNoche: pricePerNight,
          ubicacion: location,
          direccion: address,
          disponible: true,
          propietario: {
            id: 1,
          },
          imagenes: images,
        },
      });
      console.log("Respuesta del servidor: ", response.data);
    } catch (err) {
      console.log("Error al enviar la solicitud: ", err);
    }
  };

  return (

      <div className={styles.container}> 
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h2>Agregar nueva cabaña</h2>
        <form onSubmit={handleSubmit}>
          <label>Ingrese el nombre de la cabaña</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Ingrese la descripcion de la cabaña</label>
          <input
            type="text"    
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Seleccione el tipo de cabaña</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Playa">Playa</option>
            <option value="Montana">Montaña</option>
            <option value="Nevada">Nevada</option>
            <option value="Selva">Selva</option>
            <option value="Bosque">Bosque</option>
            <option value="Campo">Campo</option>
          </select>
          <label>Ingrese el precio por noche</label>
          <input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
          />
          <label>
            Ingrese la cantidad de personas que pueden acomodarse en la cabaña
          </label>
          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6+</option>
          </select>
          <label>Ingrese la locación de la cabaña</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Ingrese la dirección de la cabaña</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>Cargue aquí las imágenes correspondientes a su cabaña</label>
          <input />
          <button type="submit">Guardar cabaña</button>
        </form>
      </div>

  );
};

export default AddCabin;
