import React, { useState } from 'react';
import styles from './BookingCalendar.module.css';

const BookingCalendar = ({ onDateSelection, selectedStartDate, selectedEndDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const isDateInRange = (date, start, end) => {
    return date > start && date < end;
  };
  
  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };
  
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const isPast = date < today;
      
      const isStart = selectedStartDate && isSameDay(date, selectedStartDate);
      const isEnd = selectedEndDate && isSameDay(date, selectedEndDate);
      
      const isInRange = selectedStartDate && selectedEndDate && isDateInRange(date, selectedStartDate, selectedEndDate);
      
      let dayClassName = styles.calendarDay;
      if (isStart || isEnd) dayClassName += ` ${styles.selected}`;
      if (isStart) dayClassName += ` ${styles.startDate}`;
      if (isEnd) dayClassName += ` ${styles.endDate}`;
      if (isInRange) dayClassName += ` ${styles.dayInRange}`;
      if (isPast) dayClassName += ` ${styles.pastDay}`;
      
      days.push(
        <div 
          key={day} 
          className={dayClassName}
          onClick={() => !isPast && handleDateClick(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  const handleDateClick = (date) => {
    let newStartDate = selectedStartDate;
    let newEndDate = selectedEndDate;
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      newStartDate = date;
      newEndDate = null;
    } else {
      if (date < selectedStartDate) {
        newStartDate = date;
        newEndDate = null;
      } else {
        newEndDate = date;
      }
    }
    
    onDateSelection(newStartDate, newEndDate);
  };
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const clearDates = () => {
    onDateSelection(null, null);
  };
  
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarContent}>
        <div className={styles.calendarHeader}>
          <button 
            onClick={goToPreviousMonth}
            className={styles.navButton}
          >
            ←
          </button>
          <h2 className={styles.monthTitle}>
            {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={goToNextMonth}
            className={styles.navButton}
          >
            →
          </button>
        </div>
        
        <div className={styles.weekdayHeader}>
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>
        
        <div className={styles.calendarGrid}>
          {generateCalendarDays()}
        </div>
        
        {(selectedStartDate || selectedEndDate) && (
          <div className={styles.clearButtonContainer}>
            <button 
              onClick={clearDates}
              className={styles.clearButton}
            >
              Limpiar fechas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;