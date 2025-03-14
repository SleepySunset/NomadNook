import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./AddCabin.module.css";
import { ENDPOINTS } from "../../config/config";  
import { useAuth } from "../../hooks/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCabin = ({ onClose }) => {
  const END_POINT_CABIN = ENDPOINTS.ADD_CABIN;
  const END_POINT_CATEGORIES = ENDPOINTS.GET_ALL_CATEGORIES;
  const { user, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  // const [responseStatus, setResponseStatus] = useState("");

  useEffect(() => {
    if (user?.token) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(END_POINT_CATEGORIES, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setCategories(response.data);
        } catch (error) {
          console.log("Error al cargar categorías:", error);
        }
      };
      fetchCategories();
    }
  }, [END_POINT_CATEGORIES, user?.token]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
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
      // Mensaje de Cabaña Añadida
            Swal.fire({
                      title: "Cabaña añadida!",
                      icon: "success",
                      timer: 2000,
                      showConfirmButton: false,
                    });

      // Primero asignamos las categorías
      const categoryPromises = selectedCategories.map(categoryId => 
        axios({
          method: "post",
          url: `https://nomadnook-nomadnook.up.railway.app/api/alojamientos/${cabinId}/categorias/${categoryId}`,
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        })
      );

      try {
        await Promise.all(categoryPromises);
        console.log("Todas las categorías fueron asignadas correctamente");

        // Luego enviamos las imágenes una a una
        const imagePromises = images.map(imageUrl => 
          axios({
            method: "post",
            url: `https://nomadnook-nomadnook.up.railway.app/api/imagenes/guardar`,
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

      onClose();

    } catch (err) {
        console.log("Error al crear la cabaña:", err.response?.data || err.message);
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
                  className={styles.categoryCheckbox}
                />
                {category.nombre}
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
