import styles from "./BookingConfirmation.module.css";
import { useAuth } from "@/hooks/AuthContext";
import axios from "axios";
import { ENDPOINTS } from "../../config/config";
import { useEffect, useState } from "react";

const BookingConfirmation = ({ cabin, onClose, checkin, checkout }) => {
  const { user } = useAuth();
  const END_POINT_ADD_BOOKING = ENDPOINTS.ADD_BOOKING;
  const [totalDays, setTotalDays] = useState(null)

 
  useEffect(()=>{
    const calcAmountOfDays = () => {
      const difOnTime = checkout - checkin;
      const difOnDays = difOnTime/(1000 * 60 * 60 * 24);
      setTotalDays(difOnDays)
    }
  calcAmountOfDays()
  },[checkin,checkout])

  const handleEditDate = () =>{

  }

  const handleBookingConfirmation = async() =>{
    try{
      const response = await axios({
        method: "post",
        url: END_POINT_ADD_BOOKING,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        data: {
          clente: {
            id: user.id
          },
          alojamiento: {
            id: cabin.id
          },
          fechaInicio: checkin,
          fechaFin:checkout,
          total: totalDays
        }
        
      })
      console.log(response)
    }catch(error){
      console.log("Error al reservar: ", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h1 className={styles.mainTitle}>Confirma tu reserva</h1>
        <div className={styles.modalContent}>
          
          <div className={styles.secondContainer}>
            <h2 className={styles.secondTitle}>Tu estadía</h2>
            <div className={styles.thirdContainer}>
              <p className={styles.mainText}><strong>Fechas</strong></p>
              <p className={styles.mainText}>21 abril - 26 abril</p>
              <span className={styles.mainText} onClick={handleEditDate}>Editar</span>
            </div>
            <div className={styles.thirdContainer}>
              <h3>Tus datos</h3>
              <p className={styles.mainText}>{user?.name} {user?.lastName}</p>
              <p className={styles.mainText}>{user.email}</p>
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cabinContainer}>
              <img  src={cabin.imagenes[0].url} className={styles.cardImage}/>
              <div>
                <h3 className={styles.secondTitle}>{cabin.titulo}</h3>
                <p>{cabin.ubicacion}</p>
                <p>{cabin.descripcion}</p>
              </div>
            </div>
            <hr></hr>
            <div>
              <h2 className={styles.secondTitle}>Información del precio</h2>
              <div>
                <span>${cabin.precioPorNoche}x {totalDays} noches</span>
                <span>${cabin.precioPorNoche * totalDays}</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleBookingConfirmation}>Reservar</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
