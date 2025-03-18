import styles from "./CabinDetail.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gallery from "@/components/Gallery";
import axios from "axios";
import { ENDPOINTS } from "../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Agregar todos los iconos a la librería
library.add(fas, far, fab);

// Función para verificar si un icono existe en Font Awesome
const getIconComponent = (iconName) => {
  try {
    // Intentar obtener el icono
    const icon = library.definitions.fas[iconName] || 
                 library.definitions.far[iconName] || 
                 library.definitions.fab[iconName];
    
    if (icon) {
      return ["fas", iconName];
    }
    
    // Si no existe, retornar un icono por defecto
    return ["fas", "question-circle"];
  } catch (error) {
    console.error("Error al verificar el icono:", error);
    return ["fas", "question-circle"];
  }
};

const CabinDetail = () => {
  const { id } = useParams();
  const END_POINT = `${ENDPOINTS.GET_CABIN_BY_ID}/${id}`
  const [showModal, setShowModal] = useState(false);
  const [cabin, setCabin] = useState([]);
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    axios(END_POINT).then((res) => {
        setCabin(res.data);
        console.log(res.data);
      })
  }, [END_POINT]);
  useEffect(() => {
    axios(`${ENDPOINTS.GET_CABIN_FEATURES}/${id}`).then((res) => {
      console.log(res.data);
      setFeatures(res.data);
      console.log(features);
    });
  }, [id]);


  useEffect(() => {
    // Al abrir el modal, oculta el scroll del body
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      // Al cerrar el modal, restablece el scroll del body
      document.body.style.overflow = "auto";
    }

    // Limpia el estilo del body al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!cabin) {
    return <p className={styles.error}>Cabaña no encontrada.</p>;
  }

  return (
    <main className={styles.detail}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}></Link>
        <h1 className={styles.title}>{cabin.titulo}</h1>
        {cabin.imagenes && cabin.imagenes.length > 0 ? (
          <div className={styles.imagesContainer}>
            <img
              className={styles.mainImage}
              onClick={handleShowModal}
              src={cabin.imagenes[0].url}
              alt={`Imagen 1 de ${cabin.title}`}
            />
            <div className={styles.gallery}>
              {cabin.imagenes.slice(1, 5).map((image, index) => (
                <img
                  className={styles.galleryImg}
                  onClick={handleShowModal}
                  key={image.id}
                  src={image.url}
                  alt={`Imagen ${index + 2} de ${cabin.title}`}
                />
              ))}
            </div>
            <button
              onClick={handleShowModal}
              className={styles.showAllImagesBtn}
            >
              <p className={styles.allImagesText}>Ver más</p>
            </button>
          </div>
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
        <div className={styles.text}>
          <span className={styles.price}>
            ${cabin.precioPorNoche} por noche
          </span>
          <p className={styles.description}>{cabin.descripcion}</p>
        </div>
        <div className={styles.featuresContainer}>
          {features.map((feature) => (
            <div className={styles.feature} key={feature.id}>
              <FontAwesomeIcon 
                icon={getIconComponent(feature.icono)}
                size="lg" 
                className={styles.featureIcon} 
              />
              <p>{feature.nombre}</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Gallery images={cabin.imagenes} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CabinDetail;
