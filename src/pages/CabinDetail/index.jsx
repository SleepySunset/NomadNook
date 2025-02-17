import styles from "./CabinDetail.module.css";
import { useParams } from "react-router-dom";
import response from "../../utils/response";

const CabinDetail = () => {
  const { id } = useParams();
  const cabin = response[id - 1];

  if (!cabin) {
    return <p className={styles.error}>Cabaña no encontrada.</p>;
  }

  return (
    <main className={styles.detail}>
      <h1 className={styles.title}>{cabin.titulo}</h1>
      {cabin.imagenes && cabin.imagenes.length > 0 ? (
        <div className={styles.imageContainer}>
          <img className={styles.image} src={cabin.imagenes[0]} alt={`Imagen 1 de ${cabin.title}`}/>
          <div className={styles.imageGallery}>
            {cabin.imagenes.slice(1,5).map((image, index) => (
              <img key={index} src={image} alt={`Imagen ${index + 2} de ${cabin.title}`} />
            ))}
          </div>
        </div>
      ) : (
        <p>No hay imágenes disponibles.</p>
      )}
      <button>Ver todas las fotos</button>
      <div className={styles.text}>
        <p className={styles.description}>{cabin.descripcion}</p>
        <span className={styles.price}>${cabin.precioPorNoche} por noche</span>
      </div>
    </main>
  );
};

export default CabinDetail;
