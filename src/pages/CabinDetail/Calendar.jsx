import { useState, useEffect, useRef } from 'react';
import { DateRangePicker } from 'rsuite';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import 'rsuite/dist/rsuite.min.css';

function Calendar({
  setCheckIn,
  setCheckOut,
  checkIn,
  checkOut,
  disabledDates = [], // Parámetro para las fechas no disponibles (array de fechas)
}) {
    const containerRef = useRef(null)
  const today = dayjs().startOf('day');
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

  const handleDateChange = (newValues) => {
    if (newValues && newValues.length === 2) {
      const startDate = newValues[0];
      const endDate = newValues[1];

      setDateRange(newValues);

      // Formatear las fechas a YYYY-MM-DD y manejar nulls correctamente
      setCheckIn(startDate ? dayjs(startDate).format('YYYY-MM-DD') : null);
      setCheckOut(endDate ? dayjs(endDate).format('YYYY-MM-DD') : null);

      console.log("Check-in: ", checkIn); //para debug
      console.log("Check-out: ",checkOut); // para debug

    } else {
      setCheckIn(null);
      setCheckOut(null);
      setDateRange([null, null]);
    }
  };

  const handleRenderValue = (value) => {
    if (value && value.length === 2) {
      const startDate = value[0] ? dayjs(value[0]).format('DD MMM') : 'Check-in';
      const endDate = value[1] ? dayjs(value[1]).format('DD MMM') : 'Check-out';
      return `${startDate} - ${endDate}`;
    }
    return 'Check-in - Check-out';
  };

  const disabledDate = (date) => {
    const isBeforeToday = dayjs(date).startOf('day').isBefore(today);
    const isDisabled = disabledDates.some((disabledDateItem) =>
      dayjs(date).isSame(dayjs(disabledDateItem), 'day')
    );
    return isBeforeToday || isDisabled;
  };
  const renderCell = (date) => {
    const isWeekend = dayjs(date).day() === 0 || dayjs(date).day() === 6;
    const isDisbaled = disabledDates.some(disabledDateItem => dayjs(date).isSame(dayjs(disabledDateItem), 'day'))

    return (
        <div
            style={{
                color: isDisbaled ? '#f0f0f0' : 'black',
                fontWeight: isWeekend ? '600' : '500',
            }}
        >
            {date.getDate()}
            {isDisbaled && <span style={{fontSize: "0.8rem"}}></span>}
        </div>
    );
};

  return (
    <div className={styles.container} ref={containerRef}>
      <DateRangePicker
        className={styles.calendar}
        value={dateRange}
        onChange={handleDateChange}
        format="yyyy-MM-dd"
        editable={false}
        placeholder="Check-in / Check-out"
        renderValue={handleRenderValue}
        shouldDisableDate={disabledDate}
        ranges={[]}
        container={() => containerRef.current}
        placement='leftStart'
        size='lg'
        renderCell={renderCell}
        showHeader={false}
        weekStart={1}
      />
    </div>
  );
}

export default Calendar;