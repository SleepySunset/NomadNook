import styles from "./CabinDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gallery from "@/components/Gallery";
import axios from "axios";
import { ENDPOINTS } from "@/config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Calendar from "./Calendar";
import BookingConfirmation from "@/components/BookingConfirmation";
import { useAuth } from "@/hooks/AuthContext";
import { Heart, Share2, Copy, Lock, EyeOff, House, HandCoins } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useFavorite } from "@/hooks/useFavorite";
import { shareOnSocial, copyToClipboard } from "@/utils/shareUtils";
import Swal from "sweetalert2";
import dayjs from "dayjs"; // Make sure this import exists

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
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const navigate  = useNavigate();

  const shareUrl = window.location.href;

  const { favorite, toggleFavorite } = useFavorite({
    id: cabin.id,
    title: cabin.titulo,
    description: cabin.descripcion,
    images: cabin.imagenes,
    pricePerNight: cabin.precioPorNoche,
  });

  useEffect(() => {
    axios(END_POINT)
      .then((res) => {
        setCabin(res.data);
        console.log(res.data);
        axios(`${ENDPOINTS.GET_CABIN_FEATURES}/${res.data.id}`).then((res) => {
          console.log(res.data);
          setFeatures(res.data);
        });

        // Fechas dinamicas
        const startDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
        const endDate = dayjs().add(2, 'year').format('YYYY-MM-DD');

        axios({
          method: "get",
          url: ENDPOINTS.GET_UNAVAILABLE_DATES(
            res.data.id,
            startDate,
            endDate
          ),
        })
          .then((res) => {
            setUnavailableDates(res.data.diasNoDisponibles);
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Error fetching unavailable dates:", err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [END_POINT]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    // Al abrir el modal, oculta el scroll del body
    if (showModal || isBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Al cerrar, restablece el scroll del body
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, isBookingOpen]);

  useEffect(() => {
    console.log("Check-in: " + checkIn);
    console.log("Check-out: " + checkOut);
  }, [checkIn, checkOut]);

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
          <p className={styles.loading} color="red">
            Cargando...
          </p>
        </div>
      </main>
    );
  }
  if (Object.keys(cabin).length === 0) {
    return (
      <main className={styles.detail}>
        <div className={styles.notFound}>
          <p className={styles.notFoundText}>Cabaña no encontrada.</p>
        </div>
      </main>
    );
  }

  const handleOpenBooking = () => {
    if (checkIn && checkOut && user) {
      setIsBookingOpen(true);
      setErrorMessage("");
    } else {
      if (!user) {
        Swal.fire({
          title: "Debes estar logeado para hacer una reserva",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate(`/login?redirectTo=/cabin/${id}`));
      } else {
        setErrorMessage("Por favor seleccione las fechas de su estadía");
      }
    }
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <main className={styles.detail}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}></Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{cabin.titulo}</h1>
          <div className={styles.iconButtons}>
            <button className={styles.iconButton} onClick={toggleFavorite}>
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
            {isOpen && (
              <div
                className={styles.sharePopup}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.shareButton}
                  onClick={(e) => copyToClipboard(e, shareUrl)}
                >
                  <Copy size={20} className={styles.copy} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) =>
                    shareOnSocial(e, "whatsapp", cabin.titulo, shareUrl)
                  }
                >
                  <FaWhatsapp className={styles.whatsapp} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) => shareOnSocial(e, "x", cabin.titulo, shareUrl)}
                >
                  <img src="/x.jpeg" className={styles.x} />
                </button>
                <button
                  className={styles.shareButton}
                  onClick={(e) =>
                    shareOnSocial(e, "facebook", cabin.titulo, shareUrl)
                  }
                >
                  <FaFacebook className={styles.facebook} />
                </button>
              </div>
            )}
          </div>
        </div>

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
              <p className={styles.text}>{cabin.descripcion}</p>
            </div>
            <div className={styles.featuresContainer}>
              <h3 className={styles.title}>Características</h3>
              <div className={styles.features}>
                {features.length > 0 ? (
                  features.map((feature) => (
                    <div className={styles.feature} key={feature.id}>
                      <FontAwesomeIcon
                        icon={getIconComponent(feature.icono)}
                        size="lg"
                        className={styles.featureIcon}
                      />
                      <p>{feature.nombre}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay características disponibles.</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.sideContainer}>
            <div className={styles.priceContainer}>
              <p className={styles.price}>
                <span className={styles.value}>
                  ${cabin.precioPorNoche} USD
                </span>{" "}
                por noche
              </p>
            </div>
            <div className={styles.reserve}>
              <Calendar
                disabledDates={unavailableDates}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
              />
              <button
                onClick={handleOpenBooking}
                className={styles.bookingButton}
              >
                Reservar
              </button>
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.politicsContainer}>
      <h4 className={styles.title}>Lo que necesitas saber antes de reservar</h4>
  <div className={styles.politics}>
    {/* Columna izquierda */}
    <div className={styles.politicsColumn}>
      <div className={styles.politicItem}>
        <h4 className={styles.politicsTitle}><Lock className={styles.iconoLock}/> Política de Reservas</h4>
        <p>• Se requiere un pago total para confirmar la reserva.</p>
        <p>• Cambios de fecha sujetos a disponibilidad y posibles costos adicionales.</p>
      </div>
      <div className={styles.politicItem}>
        <h4 className={styles.politicsTitle}><House className={styles.iconoHouse}/> Política de Uso y Normas del Alojamiento</h4>
        <p>• Se prohíben fiestas y eventos sin autorización previa. Horario de check-in y check-out establecido.</p>
        <p>• Responsabilidad por daños durante la estadía.</p>
      </div>
    </div>

    {/* Columna derecha */}
    <div className={styles.politicsColumn}>
      <div className={styles.politicItem}>
        <h4 className={styles.politicsTitle}><EyeOff className={styles.iconoEyeOff}/> Política de Privacidad y Datos</h4>
        <p>• La información de los usuarios será protegida y utilizada solo para gestionar reservas.</p>
        <p>• No se compartirán datos con terceros sin consentimiento.</p>
      </div>
      <div className={styles.politicItem}>
        <h4 className={styles.politicsTitle}><HandCoins className={styles.iconoHandCoins} /> Política de Cancelación y Reembolsos</h4>
        <p>• Cancelaciones con más de 15 días de anticipación recibirán un reembolso completo/parcial.</p>
        <p>• Cancelaciones tardías pueden estar sujetas a cargos.</p>
      </div>
    </div>
  </div>
</div>

      {showModal && (
        <Gallery images={cabin.imagenes} onClose={handleCloseModal} />
      )}
      {isBookingOpen && (
        <BookingConfirmation
          onClose={handleCloseBooking}
          cabin={cabin}
          checkin={checkIn}
          checkout={checkOut}
        />
      )}
    </main>
  );
};

export default CabinDetail;
