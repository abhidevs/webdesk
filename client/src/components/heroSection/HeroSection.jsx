import React, { useContext } from "react";
import "./style.scss";
import heroImg from "../../assets/heroimg.jpg";
import { AuthContext } from "../../context/authContext/AuthContext";

const HeroSection = ({ small, large, title, dept, sem }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={"heroSection " + (large ? "large" : "small")}>
      <div className="heroSection-content">
        <div className="left">
          {large && <img src={heroImg} alt="heroimage" />}
        </div>

        <div className="right">
          <h3>
            {small
              ? dept + " " + sem + " sem"
              : `Hi ${user?.fullname.split(" ")[0]}!`}
          </h3>
          <h1>{title}</h1>
          {large && (
            <p>
              All your college schedule, notes, task, doubts will be updated
              here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
