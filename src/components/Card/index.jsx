import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Share2, Copy, MapPin } from "lucide-react"; //Star
import styles from "./Card.module.css";
import Swal from "sweetalert2";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../hooks/AuthContext";

const Card = ({
  id,
  title,
  ubicacion,
  images,
  pricePerNight,
  removeFromFavorites
}) => {
  const { user } = useAuth();
  let isAuthenticated = !!user?.token;
  const navigate = useNavigate();
  // const rating = 4.96; //de momento para ver valoración

  const [favorite, setFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const url = window.location.origin + `/cabin/${id}`;


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = storedFavorites.some((fav) => fav.id === id);
    setFavorite(isFav);
  }, [id]);
  

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        iconColor: "var(--color1)",
        html: `Para agregar a favoritos, primero debes identificarte.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Identificarme",
        confirmButtonColor: "var(--color4)",
        cancelButtonText: "Omitir",
        cancelButtonColor: "#444",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      return;
    }

    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorite) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== id);
      removeFromFavorites && removeFromFavorites(id);
    } else {
      updatedFavorites.push({ id, title, ubicacion, images, pricePerNight });
    }

    // 🌟 Guardar en localStorage y actualizar estado
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorite(!favorite);
  };

  //   try {
  //     if (favorite) {
  //       removeFromFavorites && removeFromFavorites(id);
  //       setFavorite(false);

  //       await axios.delete(END_POINT_REMOVE_FAV, {
  //         params: { usuario_id: user.id, alojamiento_id: id },
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       });

  //     } else {
  //       addToFavorites && addToFavorites({ id, title, description, images, pricePerNight });
  //       setFavorite(true);

  //       await axios.post(
  //         END_POINT_ADD_FAV,
  //         { usuario_id: user.id, alojamiento_id: id },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error(`Error ${favorite ? "eliminando" : "agregando"} favorito: `, error);
  //   }

  // Compartir

  const shareOnSocial = (e, platform) => {
    e.preventDefault();
    e.stopPropagation();
    switch (platform) {
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            "Descubrí este rincón increíble para una escapada perfecta. Su nombre es " +
              title +
              ". ¿Más información?: " +
              url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        alert(
          "Instagram no admite compartir directamente links. Copiá y compartí el enlace manualmente: " +
            url
        );
        break;
      case "x":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "Descubrí este rincón increíble para una escapada perfecta. Su nombre es " +
              title +
              ". ¿Más información?: " +
              url
          )}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url +
              "Descubrí este rincón increíble para una escapada perfecta. Su nombre es "
          )}`,
          "_blank"
        );
        break;
      default:
        alert("Red social no válida.");
    }
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard
      .writeText(url)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Enlace copiado al portapapeles",
        });
      })
      .catch((err) => console.error("Error al copiar:", err));
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
              <button className={styles.shareButton} onClick={copyToClipboard}>
                <Copy size={20} className={styles.copy} />
              </button>
              <button
                className={styles.shareButton}
                onClick={(e) => shareOnSocial(e, "whatsapp")}
              >
                <FaWhatsapp className={styles.whatsapp} />
              </button>
              <button
                className={styles.shareButton}
                onClick={(e) => shareOnSocial(e, "x")}
              >
                <img src="/x.jpeg" className={styles.x} />
              </button>
              <button
                className={styles.shareButton}
                onClick={(e) => shareOnSocial(e, "facebook")}
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
