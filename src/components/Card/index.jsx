import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Share2, Copy, MapPin } from "lucide-react";
import styles from "./Card.module.css";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { shareOnSocial, copyToClipboard } from '../../utils/shareUtils.js';

const Card = ({
  id,
  title,
  ubicacion,
  images,
  pricePerNight,
  isFavorite,
  onToggleFavorite
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  const url = window.location.origin + `/cabin/${id}`;

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = await onToggleFavorite();
    if (result !== undefined) {
      setFavorite(result);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/cabin/${id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          {images && images.length > 0 && (
            <img className={styles.image} src={images[0].url} alt={title} />
          )}
          <span className={styles.price}>
            Precio por noche ${pricePerNight}
          </span>
          <div className={styles.iconButtons}>
            <button className={styles.iconButton} onClick={handleFavoriteClick}>
              <Heart
                className={`${styles.heartIcon} ${
                  favorite ? styles.favoriteActive : ""
                }`}
                size={20}
              />
            </button>
            <button
              className={styles.iconButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <Share2 size={20} />
            </button>
          </div>
            {isOpen && (
              <div
                className={styles.sharePopup}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.shareButton}
                  onClick={(e) => copyToClipboard(e, url)}
                >
                  <Copy size={20} className={styles.copy} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) => shareOnSocial(e, "whatsapp", title, url)}
                >
                  <FaWhatsapp className={styles.whatsapp} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) => shareOnSocial(e, "x", title, url)}
                >
                  <img src="/x.jpeg" className={styles.x} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) => shareOnSocial(e, "facebook", title, url)}
                >
                  <FaFacebook className={styles.facebook} />
                </button>
              </div>
            )}
        </div>
      </Link>
      <div className={styles.text}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {/* <div className={styles.rating}>
            <span className={styles.value}>{rating.toFixed(2)}</span>
            <Star className={styles.star}></Star>
            </div> */}
        </div>
        <div className={styles.ubicacionContainer}>
        <MapPin className={styles.ubicacionIcon}/>
        <p className={styles.ubicacion}>{ubicacion}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;