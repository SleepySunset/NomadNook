import axios from "axios";
import { useState } from "react";
import styles from "./AddCabin.module.css";

const AddCabin = ({ onClose }) => {
  const END_POINT_CABIN =
    "https://nomadnook-nomadnook.up.railway.app/api/alojamientos/guardar";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PLAYA");
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const response = axios({
        method: "post",
        url: END_POINT_CABIN,
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
            id: 4,
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
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Agregar una nueva cabaña</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Ingrese el nombre de la cabaña</label>
          <input
            required
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={styles.label}>
            Ingrese la descripción de la cabaña
          </label>
          <input
            required
            className={styles.input}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={styles.label}>Seleccione el tipo de cabaña</label>
          <select
            required
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Seleccione el tipo
            </option>
            <option value="PLAYA">Playa</option>
            <option value="MONTANA">Montaña</option>
            <option value="NEVADA">Nevada</option>
            <option value="SELVA">Selva</option>
            <option value="BOSQUE">Bosque</option>
            <option value="CAMPO">Campo</option>
          </select>
          <label className={styles.label}>Ingrese el precio por noche</label>
          <input
            required
            className={styles.input}
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
          />
          <label className={styles.label}>
            Ingrese la cantidad de personas que pueden acomodarse en la cabaña
          </label>
          <select
            required
            className={styles.select}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="" disabled>
              Seleccione la capacidad
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6+</option>
          </select>
          <label className={styles.label}>
            Ingrese la locación de la cabaña
          </label>
          <input
            required
            className={styles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label className={styles.label}>
            Ingrese la dirección de la cabaña
          </label>
          <input
            required
            className={styles.input}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className={styles.label}>
            Cargue aquí las imágenes correspondientes a su cabaña
          </label>
          <input
          required
            className={styles.input}
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value, ...images)}
          />

          <button className={styles.submitBtn} type="submit">
            Guardar cabaña
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCabin;
