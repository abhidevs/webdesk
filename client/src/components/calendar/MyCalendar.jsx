import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
 import "./MyCalendar.scss"

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (Date) => {
    setDate(Date);
  };
  return <Calendar  className="calendar" showWeekNumbers onChange={onChange} value={date} />;
};

export default MyCalendar ;
