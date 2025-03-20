import styles from "./EditCabin.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, ENDPOINTS } from "../../config/config";
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const EditCabin = ({ id, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [features, setFeatures] = useState([]);
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState(null)



  const END_POINT_GET_CABIN_BY_ID = ENDPOINTS.GET_CABIN_BY_ID;
  const END_POINT_UPDATE_CABIN = ENDPOINTS.UPDATE_CABIN;
  const END_POINT_GET_CATEGORIES = ENDPOINTS.GET_ALL_CATEGORIES;
  const END_POINT_GET_FEATURES = ENDPOINTS.GET_ALL_FEATURES;
  const END_POINT_UPDATE_CATEGORIES = `${API_BASE_URL}/api/alojamientos/${id}/categorias`;
  const END_POINT_UPDATE_FEATURES = `${API_BASE_URL}/api/alojamientos/${id}/caracteristicas`;
  const END_POINT_DELETE_IMAGE = ENDPOINTS.DELETE_IMAGE;

  const { user } = useAuth();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(END_POINT_GET_FEATURES);
        setFeatures(response.data);
      } catch (error) {
        console.error("Error al cargar características:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get(END_POINT_GET_CATEGORIES);
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    const fetchCabin = async () => {
      try {
        const response = await axios(`${END_POINT_GET_CABIN_BY_ID}/${id}`);
        setTitle(response.data.titulo);
        setDescription(response.data.descripcion);
        setCapacity(response.data.capacidad);
        setPricePerNight(response.data.precioPorNoche);
        setLocation(response.data.ubicacion);
        setAddress(response.data.direccion);
        setSelectedCategories(
          response.data.categorias.map((categoria) => categoria.id)
        );
        setSelectedFeatures(
          response.data.caracteristicas.map(
            (caracteristica) => caracteristica.id
          )
        );
        setImages(response.data.imagenes)
      } catch (error) {
        console.error("Error al obtener la cabaña:", error);
      }
    };

    fetchCabin();
    fetchCategories();
    fetchFeatures();
  }, [
    id,
    END_POINT_GET_CABIN_BY_ID,
    END_POINT_GET_CATEGORIES,
    END_POINT_GET_FEATURES,
  ]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(featureId)) {
        return prev.filter((id) => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const getIconComponent = (iconName) => {
    try {
      const iconExists = Object.keys(library.definitions).some((prefix) =>
        Object.keys(library.definitions[prefix]).includes(iconName)
      );

      if (iconExists) {
        return ["fas", iconName];
      }
      return ["fas", "question-circle"];
    } catch (error) {
      console.error("Error al verificar el icono:", error);
      return ["fas", "question-circle"];
    }
  };

  const handleDeleteImage = async(imageId) =>{
    try{
      await axios.delete(`${END_POINT_DELETE_IMAGE}/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
    }catch(error){
      console.log("Error al eliminar la imagen: ", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${END_POINT_UPDATE_CABIN}/${id}`,
        {
          titulo: title,
          descripcion: description,
          capacidad: parseInt(capacity, 10),
          precioPorNoche: parseFloat(pricePerNight),
          ubicacion: location,
          direccion: address,
          disponible: true,
          propietario: {
            id: 1,
          },
          imagenes: [],
          categorias: [],
          caracteristicas: selectedCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseCategories = await axios.post(
        END_POINT_UPDATE_CATEGORIES,
        selectedCategories.map((categoryId) => ({ id: categoryId })),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseFeatures = await axios.post(
        END_POINT_UPDATE_FEATURES,
        selectedFeatures.map((featureId) => ({ id: featureId })),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      setCategories([]);
      setCapacity("");
      setPricePerNight("");
      setLocation("");
      setAddress("");
      // setImages
      setSelectedCategories([]);
      setSelectedFeatures([]);
      onClose();

      console.log(
        "Cabaña actualizada con éxito:",
        response.data,
        responseCategories.data,
        responseFeatures.data
      );
    } catch (error) {
      console.log("Error al actualizar la cabaña: ", error);
    }
  };

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
          <div className={styles.categoriesContainer}>
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
          </div>
          <label className={styles.label}>Seleccione las características</label>
          <div className={styles.featuresContainer}>
            {features.map((feature) => (
              <label key={feature.id} className={styles.featureLabel}>
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                />
                <FontAwesomeIcon
                  icon={getIconComponent(feature.icono)}
                  className={styles.featureIcon}
                />
                {feature.nombre}
              </label>
            ))}
          </div>
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
          <div className={styles.imageContainer}>
          {images.map((image) => (
            <div key={image.id} className={styles.imageInputContainer}>
              <img
                src={image.url}
                className={styles.imageSize}
              />
              <span onClick={()=> {setIsConfirmOpen(true), setSelectedImageToDelete(image.id)}}>&times;</span>
            </div>
          ))}
          </div>
          {isConfirmOpen && (
                  <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                      <h3 className={styles.modalTitle}>
                        Esta acción es permanente,
                      </h3>
                      <span className={styles.modalText}>¿Está seguro de eliminar esta imagen?</span>
                      <div className={styles.modalBtnContainer}>
                        <button className={styles.modalBtn} onClick={handleDeleteImage(selectedImageToDelete)}>
                          Sí
                        </button>
                        <button
                          className={styles.modalBtn}
                          onClick={() => setIsConfirmOpen(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
          )}

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
