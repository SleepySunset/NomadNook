import styles from "./Calendar.module.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos


function Calendar({setCheckIn, setCheckOut, checkIn, checkOut}) {
    const today = new Date();

  const handleChangeCheckIn = (date) => {
    setCheckIn(date);
    // Puedes opcionalmente establecer la fecha mínima para el check-out
    // para que no sea anterior al check-in
    if (checkIn && date > checkOut) {
        setCheckIn(null);
    }
  };

  const handleChangeCheckOut = (date) => {
    setCheckOut(date);
  };

  return (
    <div className={styles.container}>
      <div>
        <label>Check-in:</label>
        <DatePicker
          selected={checkIn}
          onChange={handleChangeCheckIn}
          dateFormat="yyyy-MM-dd"
          placeholderText="Seleccionar fecha"
          selectsStart
          minDate={today}
          startDate={checkIn}
          endDate={checkOut}
        />
      </div>
      <div>
        <label>Check-out:</label>
        <DatePicker
          selected={checkOut}
          onChange={handleChangeCheckOut}
          dateFormat="yyyy-MM-dd"
          placeholderText="Seleccionar fecha"
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn} // Opcional: Impide seleccionar una fecha anterior al check-in
        />
      </div>
    </div>
  );
}

export default Calendar;