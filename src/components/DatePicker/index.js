import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from '../Button';

import styles from './styles.module.scss';

const DatePicker = ({ minDate, onChange, title, ...props }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const handleChange = (value, event) => {
    if (onChange) {
      onChange(value, event);
    }

    setShowCalendar(false);
  }
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
    <div className={styles.datePicker}>
      <Button
        className={styles.button}
        kind="secondary"
        onClick={toggleCalendar}
        title={title}
      />
      {showCalendar && (
        <div className={styles.calendarContainer}>
          <Calendar
            maxDate={new Date()}
            minDate={minDate}
            minDetail="year"
            onChange={handleChange}
            {...props}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
