import styles from "./EditCabin.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../../config/config";

const EditCabin = ({ id, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [categories, setCategories] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  // const [images, setImages] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);

  const END_POINT_GET_BY_ID = ENDPOINTS.GET_CABIN_BY_ID;

  useEffect(() => {
    const fetchCabin = async () => {
      try {
        const response = await axios(`${END_POINT_GET_BY_ID}/${id}`);
        setTitle(response.data.titulo);
        setDescription(response.data.descripcion);
        setCapacity(response.data.capacidad);
        setPricePerNight(response.data.precioPorNoche);
        setLocation(response.data.ubicacion);
        setAddress(response.data.direccion);
        // setSelectedCategories(response.data.categorias);
      } catch (error) {
        console.error("Error al obtener la cabaña:", error);
      }
    };

    fetchCabin();
  }, [id, END_POINT_GET_BY_ID]);

  const handleSubmit = () => {

  }
 
  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Editar cabaña</h2>
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
          <label className={styles.label}>Seleccione las categorías</label>
          {/* <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <label key={category.id} className={styles.categoryLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className={styles.categoryCheckbox}
                />
                {category.nombre}
              </label>
            ))}
          </div> */}
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
          {/* <label className={styles.label}>
            Cargue aquí las imágenes correspondientes a su cabaña
          </label>
          {images.map((image, index) => (
            <div key={index} className={styles.imageInputContainer}>
              <input
                required
                className={styles.input}
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`URL de imagen ${index + 1}`}
              />
              <button
                type="button"
                className={styles.imgInputBtn}
                onClick={() => deleteImageInput(index)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.imgInputBtn}
            onClick={addImageInput}
          >
            Agregar url
          </button> */}

          <button className={styles.submitBtn} type="submit">
            Actualizar cabaña
          </button>
          {/* {responseStatus == "success" ? (
                <div>Cabaña agregada con éxito</div>
              ) : (
                <div>No se ha podido agregar la cabaña</div>
              )} */}
        </form>
      </div>
    </div>
  );
};

export default EditCabin;
