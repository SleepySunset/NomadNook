import { useState, useRef } from "react";
import { DateRangePicker } from "rsuite";
import dayjs from "dayjs";
import styles from "./Calendar.module.css";
import "rsuite/dist/rsuite.min.css";

function Calendar({ setCheckIn, setCheckOut, checkIn, checkOut }) {
  const today = dayjs().startOf("day"); // Obtiene la fecha de hoy al inicio del día
  const containerRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    checkIn ? dayjs(checkIn).toDate() : null,
    checkOut ? dayjs(checkOut).toDate() : null,
  ]);

  const handleDateChange = (newValues) => {
    if (newValues && newValues.length === 2) {
      const startDate = newValues[0];
      const endDate = newValues[1];

      setDateRange(newValues);

      setCheckIn(startDate ? startDate : null);
      setCheckOut(endDate ? endDate : null);
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
    return dayjs(date).startOf("day").isBefore(today);
  };




  return (
    <div className={styles.container} ref={containerRef}>
      <DateRangePicker
        className={styles.dateRangePicker}
        value={dateRange}
        onChange={handleDateChange}
        format="yyyy-MM-dd"
        editable={false}
        placeholder="Check-in / Check-out"
        renderValue={handleRenderValue}
        shouldDisableDate={disabledDate}
        ranges={[]}
        container={() => containerRef.current}
        placement="bottom"
        size="lg"
        showHeader={false}
        weekStart={1}
      />
    </div>
  );
}

export default Calendar;

// type Size = 'lg' | 'md' | 'sm' | 'xs';
// type Status = 'success' | 'warning' | 'error' | 'info';
// type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
// type Appearance = 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
// type Placement4 = 'top' | 'bottom' | 'right' | 'left';
// type Placement8 = 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd' | 'leftStart' | 'rightStart' | 'leftEnd' | 'rightEnd';
// type PlacementAuto = 'auto' | 'autoVertical' | 'autoVerticalStart' | 'autoVerticalEnd' | 'autoHorizontal' | 'autoHorizontalStart' | 'autoHorizontalEnd';
// type Placement = Placement4 | Placement8 | PlacementAuto;
// type CheckTrigger = 'change' | 'blur' | 'none' | null;
// type DisplayState = 'show' | 'hide' | 'hiding';