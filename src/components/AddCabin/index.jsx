import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./AddCabin.module.css";
import { ENDPOINTS, API_BASE_URL } from "@/config/config";
import { useAuth } from "@/hooks/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ImageUploader from "../ImageUploader";

library.add(fas, far, fab);

const AddCabin = ({ onClose }) => {
  const END_POINT_CABIN = ENDPOINTS.ADD_CABIN;
  const END_POINT_CATEGORIES = ENDPOINTS.GET_ALL_CATEGORIES;
  const END_POINT_FEATURES = ENDPOINTS.GET_ALL_FEATURES;
  const END_POINT_UPLOAD_IMAGES = ENDPOINTS.UPLOAD_IMAGES;
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user?.token) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(END_POINT_CATEGORIES);
          setCategories(response.data);
        } catch (error) {
          console.error("Error al cargar categorías:", error);
        }
      };

      const fetchFeatures = async () => {
        try {
          const response = await axios.get(END_POINT_FEATURES);
          setFeatures(response.data);
        } catch (error) {
          console.error("Error al cargar características:", error);
        }
      };

      fetchCategories();
      fetchFeatures();
    } else {
      return <Navigate to="/login" replace />;
    }
  }, [END_POINT_CATEGORIES, END_POINT_FEATURES, user?.token]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: END_POINT_CABIN,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        data: {
          titulo: title,
          descripcion: description,
          capacidad: parseInt(capacity),
          precioPorNoche: parseFloat(pricePerNight),
          ubicacion: location,
          direccion: address,
          disponible: true,
          propietario: {
            id: 2,
          },
        },
      });

      const cabinId = response.data.id;
      console.log("Cabaña creada con ID:", cabinId);

      Swal.fire({
        title: "Cabaña añadida!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      const categoryPromises = selectedCategories.map((categoryId) =>
        axios({
          method: "post",
          url: `${API_BASE_URL}/api/alojamientos/${cabinId}/categorias/${categoryId}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        })
      );
      const featuresPromises = selectedFeatures.map((featureId) =>
        axios({
          method: "post",
          url: `${API_BASE_URL}/api/alojamientos/${cabinId}/caracteristicas/${featureId}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        })
      );
      if (selectedImages.length !== 0) {
        const formData = new FormData();
        formData.append("alojamiento", cabinId);
        selectedImages.forEach((image) => {
          formData.append("files", image);
        });
        console.log("Imágenes antes de enviar:", selectedImages);

        try {
          const responseImage = await axios.post(
            END_POINT_UPLOAD_IMAGES,
            formData,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Imagenes cargadas correctamente: ",responseImage);
        } catch (error) {
          console.log("Error al cargar imagenes: ", error);
        }
      }

      try {
        await Promise.all(categoryPromises);
        console.log("Todas las categorías fueron asignadas correctamente");

        await Promise.all(featuresPromises);
        console.log("Todas las características fueron asignadas correctamente");
      } catch (error) {
        if (error.response) {
          console.error("Error con la respuesta:", error.response.data);
        } else if (error.request) {
          console.error("Error con la petición:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }

      setTitle("");
      setDescription("");
      setCapacity("");
      setPricePerNight("");
      setLocation("");
      setAddress("");
      setSelectedCategories([]);
      setSelectedFeatures([]);
      setSelectedImages([]);
      onClose();
    } catch (err) {
      console.error(
        "Error al crear la cabaña:",
        err.response?.data || err.message
      );
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
          <label className={styles.label}>Seleccione las categorías</label>
          <div className={styles.optionsContainer}>
            {categories.map((category) => (
              <label
                key={category.id}
                className={`${styles.optionLabel} ${
                  selectedCategories.includes(category.id)
                    ? styles.selected
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className={styles.hiddenCheckbox}
                />
                <FontAwesomeIcon
                  icon={getIconComponent(category.icono)}
                  size="lg"
                  className={styles.icon}
                />
                {category.nombre}
              </label>
            ))}
          </div>
          <label className={styles.label}>Seleccione las características</label>
          <div className={styles.optionsContainer}>
            {features.map((feature) => (
              <label
                key={feature.id}
                className={`${styles.optionLabel} ${
                  selectedFeatures.includes(feature.id) ? styles.selected : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                  className={styles.hiddenCheckbox}
                />
                <FontAwesomeIcon
                  icon={getIconComponent(feature.icono)}
                  className={styles.icon}
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
            Cargue aquí las imágenes de su cabaña
          </label>
          <ImageUploader onImagesSelected={setSelectedImages} />

          <button className={styles.submitBtn} type="submit">
            Guardar cabaña
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCabin;
