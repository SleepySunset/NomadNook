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
import Calendar from "./Calendar";

library.add(fas, far, fab);

const getIconComponent = (iconName) => {
  try {
    const icon =
      library.definitions.fas[iconName] ||
      library.definitions.far[iconName] ||
      library.definitions.fab[iconName];

    if (icon) {
      return ["fas", iconName];
    }

    return ["fas", "question-circle"];
  } catch (error) {
    console.error("Error al verificar el icono:", error);
    return ["fas", "question-circle"];
  }
};

const CabinDetail = () => {
  const { id } = useParams();
  const END_POINT = `${ENDPOINTS.GET_CABIN_BY_ID}/${id}`;
  const [showModal, setShowModal] = useState(false);
  const [cabin, setCabin] = useState({});
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailableDates, setUnavailableDates] = useState([]); // Ejemplo de fechas deshabilitadas


  useEffect(() => {
    axios(END_POINT).then((res) => {
      setCabin(res.data);
      console.log(res.data);
      axios(`${ENDPOINTS.GET_CABIN_FEATURES}/${res.data.id}`).then((res) => {
        console.log(res.data);
        setFeatures(res.data);
      });
        axios({
          method: "get",
          url: ENDPOINTS.GET_UNAVAILABLE_DATES(res.data.id, "2025-03-01","2025-05-01"),
          
        }).then((res) => {
          setUnavailableDates(res.data.diasNoDisponibles);
          console.log(res.data) // Asumiendo que res.data es un array de strings 'yyyy-mm-dd'
        })
        .catch((err) => {
          console.error("Error fetching unavailable dates:", err);
        });;

    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [END_POINT]);
  

  useEffect(() => {
    // Al abrir el modal, oculta el scroll del body
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      // Al cerrar, restablece el scroll del body
      document.body.style.overflow = "auto";
    }

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

  if (loading) {
    return (
      <main className={styles.detail}>
        <div className={styles.loadingContainer}>
          <p className={styles.loading} color="red">Cargando...</p>
        </div>
      </main>
    )
  }
  if (Object.keys(cabin).length === 0) {
    return (
      <main className={styles.detail}>
        <div className={styles.notFound}>
          <p className={styles.notFoundText}>Cabaña no encontrada.</p>
        </div>
      </main>
    )
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
              alt={`Imagen 1 de ${cabin.titulo}`}
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
              <button
                onClick={handleShowModal}
                className={styles.showAllImagesBtn}
              >
                Ver más
              </button>
            </div>
          </div>
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.description}>
              <h3 className={styles.title}>Descripción</h3>
              <p className={styles.text}>
                {cabin.descripcion}
              </p>
              </div>
            <div className={styles.featuresContainer}>
              <h3 className={styles.title}>Características</h3>
              <div className={styles.features}>
                {features.length > 0? features.map((feature) => (
                  <div className={styles.feature} key={feature.id}>
                    <FontAwesomeIcon
                      icon={getIconComponent(feature.icono)}
                      size="lg"
                      className={styles.featureIcon}
                    />
                    <p>{feature.nombre}</p>
                  </div>
                )) : <p>No hay características disponibles.</p>}
              </div>
            </div>
          </div>
          <div className={styles.sideContainer}>
            <div className={styles.priceContainer}>
              <p className={styles.price}>
                <span className={styles.value}>${cabin.precioPorNoche} USD</span> por noche
              </p>
            </div>
            <div className={styles.reserve}>
              <Calendar disabledDates={unavailableDates} />
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <div className={styles.availableLegend}></div>
                  <span>Disponible</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.unavailableLegend}></div>
                  <span>No disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Gallery images={cabin.imagenes} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CabinDetail;
