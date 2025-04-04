import { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "rsuite";
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import styles from "./Calendar.module.css";
import "rsuite/dist/rsuite.min.css";
import useViewport from '@/hooks/useViewport';  // Add this import

function Calendar({
  setCheckIn,
  setCheckOut,
  checkIn,
  checkOut,
  disabledDates = [], // Optional array of disabled dates
  placement = 'bottom', // Optional placement with default value
  appearance = 'default', // Optional appearance with default value ("default", "subtle")
}) {
  const { width } = useViewport();
  const containerRef = useRef(null);
  const today = dayjs().startOf("day");
  const [dateRange, setDateRange] = useState([
    checkIn ? dayjs(checkIn).toDate() : null,
    checkOut ? dayjs(checkOut).toDate() : null,
  ]);

  useEffect(() => {
    setDateRange([
      checkIn ? dayjs(checkIn).toDate() : null,
      checkOut ? dayjs(checkOut).toDate() : null,
    ]);
  }, [checkIn, checkOut]);

  const hasDisabledDateInRange = (startDate, endDate) => {
    if (!startDate || !endDate || disabledDates.length === 0) return false;
    
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    
    return disabledDates.some(disabledDate => {
      const date = dayjs(disabledDate);
      return date.isAfter(start) && date.isBefore(end) || 
             date.isSame(start, 'day') || 
             date.isSame(end, 'day');
    });
  };

  const handleDateChange = (newValues) => {
    if (newValues && newValues.length === 2) {
      const startDate = newValues[0];
      const endDate = newValues[1];

      if (hasDisabledDateInRange(startDate, endDate)) {
        Swal.fire({
          icon: 'error',
          title: 'Rango de fechas inválido',
          text: 'No puedes seleccionar un rango de fechas que incluya días ocupados.',
        });
        setDateRange([null, null]);
        setCheckIn(null);
        setCheckOut(null);
        return;
      }

      setDateRange(newValues);
      setCheckIn(startDate ? dayjs(startDate).format("YYYY-MM-DD") : null);
      setCheckOut(endDate ? dayjs(endDate).format("YYYY-MM-DD") : null);
    } else {
      setCheckIn(null);
      setCheckOut(null);
      setDateRange([null, null]);
    }
  };

  const handleRenderValue = (value) => {
    if (value && value.length === 2) {
      const startDate = value[0]
        ? dayjs(value[0]).format("DD MMM")
        : "Check-in";
      const endDate = value[1] ? dayjs(value[1]).format("DD MMM") : "Check-out";
      return `${startDate} - ${endDate}`;
    }
    return "Check-in - Check-out";
  };

  const disabledDate = (date) => {
    const isBeforeToday = dayjs(date).startOf("day").isBefore(today);
    const isDisabled = disabledDates.length > 0 && disabledDates.some((disabledDateItem) =>
      dayjs(date).isSame(dayjs(disabledDateItem), "day")
    );
    return isBeforeToday || isDisabled;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <DateRangePicker
        className={`${appearance === 'subtle' ? styles.dateRangePickerSubtle : styles.dateRangePicker} '`}
        value={dateRange}
        onChange={handleDateChange}
        format="yyyy-MM-dd"
        editable={false}
        placeholder="Check-in / Check-out"
        renderValue={handleRenderValue}
        shouldDisableDate={disabledDate}
        ranges={[]}
        container={() => containerRef.current}
        placement={width <= 768 ? 'bottom' : placement}
        size={width <= 768 ? 'md' : 'lg'}
        showOneCalendar={width <= 768 ? true : false}
        showHeader={false}
        appearance={appearance}
        weekStart={1}
      />
    </div>
  );
}

export default Calendar;

