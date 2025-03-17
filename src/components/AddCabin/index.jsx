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

library.add(fas, far, fab);

const AddCabin = ({ onClose }) => {
  const END_POINT_CABIN = ENDPOINTS.ADD_CABIN;
  const END_POINT_CATEGORIES = ENDPOINTS.GET_ALL_CATEGORIES;
  const END_POINT_FEATURES = ENDPOINTS.GET_ALL_FEATURES;
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  
  
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
    }else{
      return <Navigate to="/login" replace />;
    }
  }, [END_POINT_CATEGORIES, END_POINT_FEATURES, user?.token]);
  

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const addImageInput = () => {
    setImages([...images, ""]);
  };

  const deleteImageInput = (index) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const getIconComponent = (iconName) => {
    try {
      const iconExists = Object.keys(library.definitions).some(prefix =>
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
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
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
            id: 2
          }
        }
      });

      const cabinId = response.data.id;
      console.log("Cabaña creada con ID:", cabinId);
            Swal.fire({
                      title: "Cabaña añadida!",
                      icon: "success",
                      timer: 2000,
                      showConfirmButton: false,
                    });

      const categoryPromises = selectedCategories.map(categoryId => 
        axios({
          method: "post",
          url: `${API_BASE_URL}/api/alojamientos/${cabinId}/categorias/${categoryId}`,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        })
      );
      const featuresPromises = selectedFeatures.map(featureId => 
        axios({
          method: "post",
          url: `${API_BASE_URL}/api/alojamientos/${cabinId}/caracteristicas/${featureId}`,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        })
      );

      try {
        await Promise.all(categoryPromises);
        console.log("Todas las categorías fueron asignadas correctamente");

        await Promise.all(featuresPromises);
        console.log("Todas las características fueron asignadas correctamente");

        const imagePromises = images.map(imageUrl => 
          axios({
            method: "post",
            url: `${API_BASE_URL}/api/imagenes/guardar`,
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            },
            data: {
              url: imageUrl,
              alojamiento: {
                id: cabinId
              }
            }
          })
        );

        await Promise.all(imagePromises);
        console.log("Todas las imágenes fueron guardadas correctamente");

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
      setImages([]);
      setSelectedCategories([]);
      setSelectedFeatures([]);
      onClose();

    } catch (err) {
        console.error("Error al crear la cabaña:", err.response?.data || err.message);
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
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <label key={category.id} className={styles.categoryLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
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
          </button>

          <button className={styles.submitBtn} type="submit">
            Guardar cabaña
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

export default AddCabin;
