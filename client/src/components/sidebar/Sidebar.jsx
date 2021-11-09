import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getSubjects } from "../../context/subjectsContext/apiCalls";
import { SubjectsContext } from "../../context/subjectsContext/SubjectsContext";

import HomeWidget from "../homeWidget/HomeWidget";
import "./style.scss";

const Sidebar = () => {
  const [date, setDate] = useState(new Date());

  const { user } = useContext(AuthContext);
  const { subjects, dispatch } = useContext(SubjectsContext);

  useEffect(() => {
    subjects.length === 0 && getSubjects(user, dispatch);
  }, [dispatch]);

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
        forLargeItems
        itemList={subjects}
        noSeeAll
      />
    </div>
  );
};

export default Sidebar;
