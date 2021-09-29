import React from "react";
import "./herosection.scss";
import helloimage from "../images/heroimg.jpg";
export default function Herosection() {
  return (
    <>
{/* spacing at the top  */}

    <div className="topspace">

    
      <div className="herosection">
        <div className="herosection-content">
          {/* image of hero section start  */}

          <div className="upimg">
            <img src={helloimage} alt="Images" />
          </div>

          {/* image of hero section end  */}

          {/* content  of hero section start */}

          <div className="textarea">
            <h3>Hi Jana!</h3>
            <h1>Welcome To WebDesk</h1>
            <p>All your college schedule, notes, task, doubts will be updated here. </p>
          </div>

          {/* content  of hero section end */}
        </div>
      </div>
      </div>
    </>
  );
}
