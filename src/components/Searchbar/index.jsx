import { useState, useEffect, useRef } from "react";
import styles from "./Searchbar.module.css";
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookingCalendar from '@/components/BookingCalendar';

const Searchbar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const calendarRef = useRef(null);
  const calendarButtonRef = useRef(null);
  
  const toggleCalendar = (e) => {
    e.preventDefault();
    setShowCalendar(!showCalendar);
  };
  
  const handleDateSelection = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) &&
        !calendarButtonRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };
  
  const getDateRangeText = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
    } else if (selectedStartDate) {
      return `Desde ${formatDate(selectedStartDate)}`;
    }
    return "Seleccionar fechas";
  };
  
  return (
    <div className={styles.searchbarContainer}>
      <form className={styles.form} role="search" aria-label="Buscar en el sitio">
        <label className={styles.label} htmlFor="search"></label>
        <input
          className={styles.input}
          type="search"
          id="search"
          name="q"
          placeholder="¿Qué estás buscando?"
        />
        <button
          type="button"
          className={styles.calendarButton}
          onClick={toggleCalendar}
          aria-label="Abrir calendario"
          ref={calendarButtonRef}
        >
          <span className={styles.dateText}>{getDateRangeText()}</span>
          <CalendarMonthIcon />
        </button>
        <button type="submit" className={styles.icon}>
          <SearchIcon />
        </button>
      </form>
      
      <div 
        className={`${styles.calendarPopup} ${showCalendar ? styles.calendarPopupVisible : ''}`}
        ref={calendarRef}
      >
        <BookingCalendar
          onDateSelection={handleDateSelection}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
        />
      </div>
    </div>
  );
};

export default Searchbar;