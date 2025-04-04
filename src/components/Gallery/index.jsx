import styles from "./Gallery.module.css";

const Gallery = ({ images, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.head}>
        <button className={styles.back} onClick={onClose}></button>
      </div>
      <div className={styles.content}>
        {images.map((image, index) => (
          <img className={styles.image} style={{animationDelay:`${(index*100)+100}ms`}} key={image.id} src={image.url} alt={`Imagen ${index + 1}`} />
        ))}

      </div>
    </div>
  )
}

export default Gallery
