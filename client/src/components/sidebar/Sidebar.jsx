import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { allClassesArray } from "../../dummydata";
import HomeWidget from "../homeWidget/HomeWidget";
import "./style.scss";

const Sidebar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (Date) => {
    setDate(Date);
  };

  return (
    <div className="sidebar">
      <h2>Calendar</h2>
      <Calendar
        className="calendar"
        showWeekNumbers
        onChange={onChange}
        value={date}
      />
      <HomeWidget
        title="All Classes"
        type="all-classes"
        data={allClassesArray}
        forLargeItems
        noSeeAll
      />
    </div>
  );
};

export default Sidebar;
