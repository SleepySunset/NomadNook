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
import ImageUploader from "../ImageUploader";
import Swal from "sweetalert2";

library.add(fas, far, fab);

const EditCabin = ({ id, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const END_POINT_GET_CABIN_BY_ID = ENDPOINTS.GET_CABIN_BY_ID;
  const END_POINT_UPDATE_CABIN = ENDPOINTS.UPDATE_CABIN;
  const END_POINT_GET_CATEGORIES = ENDPOINTS.GET_ALL_CATEGORIES;
  const END_POINT_GET_FEATURES = ENDPOINTS.GET_ALL_FEATURES;
  const END_POINT_UPDATE_CATEGORIES = `${API_BASE_URL}/api/alojamientos/${id}/categorias`;
  const END_POINT_UPDATE_FEATURES = `${API_BASE_URL}/api/alojamientos/${id}/caracteristicas`;
  const END_POINT_UPLOAD_IMAGES = ENDPOINTS.UPLOAD_IMAGES;
  const END_POINT_DELETE_IMAGE = ENDPOINTS.DELETE_IMAGE;

  const { user } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setCategories([]);
      setCapacity("");
      setPricePerNight("");
      setLocation("");
      setAddress("");
      setImages([]);
      setSelectedCategories([]);
      setSelectedFeatures([]);
      setSelectedImages([]);
      onClose();
    }
  }, [isSuccess, onClose]);

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
        setImages(response.data.imagenes);
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

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`${END_POINT_DELETE_IMAGE}/${imageId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );

      setIsConfirmOpen(false);
      setSelectedImageToDelete(null);
    } catch (error) {
      console.log("Error al eliminar la imagen: ", error);
    }
  };

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

      if (selectedImages.length !==0) {
        const formData = new FormData();
        formData.append("alojamiento", id);
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
          console.log(responseImage);
        } catch (error) {
          console.log("Error al cargar imagenes: ", error);
        }
      }

      setIsSuccess(true);
      console.log(
        "Cabaña actualizada con éxito:",
        response.data,
        responseCategories.data,
        responseFeatures.data
      );
      Swal.fire({
        title: "Cabaña editada con éxito!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
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

          <label className={styles.label}>Edite las imágenes cargadas</label>
          {images.length === 0 ? (
            <span>No hay imágenes disponibles</span>
          ) : (
            <div className={styles.imageContainer}>
              {images.map((image) => (
                <div key={image.id} className={styles.imageInputContainer}>
                  <img
                    src={image.url}
                    className={styles.imageSize}
                    alt="Imagen cargada"
                  />
                  <span
                    className={styles.close}
                    onClick={() => {
                      setIsConfirmOpen(true);
                      setSelectedImageToDelete(image.id);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )}
          <label className={styles.label}>
            Agregue imágenes extra a su cabaña
          </label>
          <ImageUploader onImagesSelected={setSelectedImages} />
          {isConfirmOpen && (
            <div className={styles.confirmDeleteContainer}>
              <div className={styles.confirmDeleteContent}>
                <h3 className={styles.confirmDeleteTitle}>
                  Esta acción es permanente,
                </h3>
                <span className={styles.confirmDeleteText}>
                  ¿Está seguro de eliminar esta imagen?
                </span>
                <div className={styles.confirmDeleteBtnContainer}>
                  <button
                    type="button"
                    className={styles.confirmDeleteBtn}
                    onClick={() => handleDeleteImage(selectedImageToDelete)}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    className={styles.confirmDeleteBtn}
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
        </form>
      </div>
    </div>
  );
};

export default EditCabin;
