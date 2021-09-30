import React from "react";
import "./style.scss";
import heroImg from "../../assets/heroimg.jpg";

const Herosection = () => {
  return (
    <div className="heroSection">
      <div className="heroSection-content">
        <div className="left">
          <img src={heroImg} alt="heroimage" />
        </div>

        <div className="right">
          <h3>Hi Jane!</h3>
          <h1>Welcome To WebDesk</h1>
          <p>
            All your college schedule, notes, task, doubts will be updated here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
