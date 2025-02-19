import styles from "./CabinDetail.module.css";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import response from "@/utils/response";
import {Link} from "react-router-dom";
import Gallery from "@/components/Gallery";


const CabinDetail = () => {
  const { id } = useParams();
  const cabin = response[id - 1];
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Al abrir el modal, oculta el scroll del body
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      // Al cerrar el modal, restablece el scroll del body
      document.body.style.overflow = 'auto';
    }

    // Limpia el estilo del body al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  if (!cabin) {
    return <p className={styles.error}>Cabaña no encontrada.</p>;
  }

  return (
    <main className={styles.detail}>
      <div className={styles.container}>
      <Link to="/" className={styles.backButton}>volver</Link>
        <h1 className={styles.title}>{cabin.titulo}</h1>
        {cabin.imagenes && cabin.imagenes.length > 0 ? (
          <div className={styles.imagesContainer}>
            <img className={styles.mainImage} onClick={handleShowModal} src={cabin.imagenes[0]} alt={`Imagen 1 de ${cabin.title}`}/>
            <div className={styles.gallery}>
              {cabin.imagenes.slice(1,5).map((image, index) => (
                <img className={styles.galleryImg} onClick={handleShowModal} key={index} src={image} alt={`Imagen ${index + 2} de ${cabin.title}`} />
              ))}
            </div>
            <button onClick={handleShowModal} className={styles.showAllImagesBtn}>
              <p className={styles.allImagesText}>Mostrar todas las fotos</p>
            </button>
          </div>
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
        <div className={styles.text}>
          <span className={styles.price}>${cabin.precioPorNoche} por noche</span>
          <p className={styles.description}>{cabin.descripcion}</p>
        </div>
      </div>
      {showModal && (
        <Gallery images={cabin.imagenes} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CabinDetail;
