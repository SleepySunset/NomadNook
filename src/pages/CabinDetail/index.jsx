import styles from "./CabinDetail.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gallery from "@/components/Gallery";
import axios from "axios";

const CabinDetail = () => {
  const { id } = useParams();
  const END_POINT = `https://nomadnook-nomadnook.up.railway.app/api/alojamientos/buscar/${id}`
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(END_POINT).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [END_POINT]);

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

  if (!data) {
    return <p className={styles.error}>Cabaña no encontrada.</p>;
  }

  return (
    <main className={styles.detail}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}></Link>
        <h1 className={styles.title}>{data.titulo}</h1>
        {data.imagenes && data.imagenes.length > 0 ? (
          <div className={styles.imagesContainer}>
            <img
              className={styles.mainImage}
              onClick={handleShowModal}
              src={data.imagenes[0].url}
              alt={`Imagen 1 de ${data.title}`}
            />
            <div className={styles.gallery}>
              {data.imagenes.slice(1, 5).map((image, index) => (
                <img
                  className={styles.galleryImg}
                  onClick={handleShowModal}
                  key={image.id}
                  src={image.url}
                  alt={`Imagen ${index + 2} de ${data.title}`}
                />
              ))}
            </div>
            <button
              onClick={handleShowModal}
              className={styles.showAllImagesBtn}
            >
              <p className={styles.allImagesText}>Mostrar todas las fotos</p>
            </button>
          </div>
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
        <div className={styles.text}>
          <span className={styles.price}>
            ${data.precioPorNoche} por noche
          </span>
          <p className={styles.description}>{data.descripcion}</p>
        </div>
      </div>
      {showModal && (
        <Gallery images={data.imagenes} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CabinDetail;
