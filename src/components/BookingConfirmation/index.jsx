import styles from "./BookingConfirmation.module.css";
import { useAuth } from "@/hooks/AuthContext";
import axios from "axios";
import { MapPin } from "lucide-react";
import { ENDPOINTS } from "../../config/config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Calendar from "@/components/Calendar";
import dayjs from 'dayjs';

const BookingConfirmation = ({ cabin, onClose, checkIn, checkOut, setCheckIn, setCheckOut, unavailableDates }) => {
  const { user } = useAuth();
  const END_POINT_ADD_BOOKING = ENDPOINTS.ADD_BOOKING;
  const [totalDays, setTotalDays] = useState(0);
  const todaysDate = new Date();

  useEffect(() => {
    const calcAmountOfDays = () => {
      const start = dayjs(checkIn);
      const end = dayjs(checkOut);
      const days = end.diff(start, 'day');
      setTotalDays(days);
    };
    calcAmountOfDays();
  }, [checkIn, checkOut]);


  const handleBookingConfirmation = async () => {
    try {
      console.log("Reserva")
      console.log(checkIn)
      console.log(checkOut)
      console.log(typeof(checkIn))
      console.log(typeof(checkIn))
      const response = await axios({
        method: "post",
        url: END_POINT_ADD_BOOKING,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        data: {
          cliente: {
            id: user.id,
          },
          alojamiento: {
            id: cabin.id,
          },
          fechaInicio: checkIn,
          fechaFin: checkOut,
          total: totalDays,
          estado: "CONFIRMADA",
          fechaReserva: todaysDate
        },
      });
      if (response.status === 200){
        console.log("Reserva creada con éxito")
        onClose(true)
         Swal.fire({
                title: "Reserva creada con éxito",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
      }else{
        console.log("Error al reservar")
        Swal.fire({
          title: "Error al crear la reserva",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log("Error al reservar: ", error);
    }
  };

  return  checkIn && checkOut ? (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h1 className={styles.mainTitle}>Confirma tu reserva</h1>
        <div className={styles.modalContent}>
          <div className={styles.secondContainer}>
            <h2 className={styles.secondTitle}>Tu estadía</h2>
            <div className={styles.thirdContainer}>
              <p className={styles.mainText}>
                <strong>Fechas</strong>
              </p>

              <Calendar
                disabledDates={unavailableDates}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                placement='rightStart'
              />
            </div>
            <div className={styles.thirdContainer}>
              <h2 className={styles.secondTitle}>Tus datos</h2>
              <p className={styles.mainText}>
                {user?.name} {user?.lastName}
              </p>
              <p className={styles.mainText}>{user.email}</p>
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cabinContainer}>
              <img src={cabin.imagenes[0].url} className={styles.cardImage} />
              <div>
                <h3 className={styles.secondTitle}>{cabin.titulo}</h3>
                <div className={styles.location}>
                  <MapPin className={styles.locationIcon} />

                  <span>{cabin.ubicacion}</span>
                </div>

                <p>{cabin.descripcion.length > 60 ? cabin.descripcion.slice(0, 60) + "..." : cabin.descripcion}</p>
              </div>
            </div>
            <hr></hr>
            <div>
              <h2 className={styles.secondTitle}>Información del precio</h2>
              <div className={styles.priceContainer}>
                <span className={styles.mainText}>
                  ${cabin.precioPorNoche}USD x {totalDays} noches
                </span>
                <span className={styles.mainText}>
                  ${parseInt(cabin.precioPorNoche) * totalDays} USD
                </span>
              </div>
            </div>
            <hr></hr>
            <div className={styles.priceContainer}>
              <span className={styles.mainText}>
                <strong>Total(USD)</strong>
              </span>
              <span className={styles.mainText}>
                ${parseInt(cabin.precioPorNoche) * totalDays} USD
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleBookingConfirmation}
          className={styles.bookingButton}
        >
          Reservar
        </button>
      </div>
    </div>
  ) : (
    <p className={styles.errorMessage}>Las fechas de check-in y check-out son obligatorias.</p>
  )
  };

export default BookingConfirmation;
