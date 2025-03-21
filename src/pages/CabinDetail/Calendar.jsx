import { useState, useEffect } from 'react';
import styles from './Calendar.module.css'; // Asegúrate de crear este archivo CSS

const Calendar = ({ disabledDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    generateCalendar();
  }, [currentDate, disabledDates]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: '', disabled: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const isDisabled = disabledDates.includes(dateString);
      calendarDays.push({ day: i, date: dateString, disabled: isDisabled });
    }
    setDays(calendarDays);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getMonthName = (date) => {
    return date.toLocaleString('es-ES', { month: 'long' });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={goToPreviousMonth}>{'<'}</button>
        <div className={styles.monthYear}>
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </div>
        <button className={styles.navButton} onClick={goToNextMonth}>{'>'}</button>
      </div>
      <div className={styles.weekdays}>
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>
      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${day.disabled ? styles.disabled : ''}`}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;