import React from "react";
import "./HomeWidget.scss";
import notemeterialimage from "../images/notemeterial.jpg";
import assignmenticon from "../images/iconassign.png";

export default function Notemeterial() {
  return (
    <>
      <div className="side">
        {/* contain start   1 */}

        <div className="container-note">
          {/* meterial start  1*/}

          <div className="meterial">
            <h1>Notes & Materials</h1>
            <a href="">see all</a>
          </div>
          {/* meterial end   */}





          {/* boxmodel start 1*/}

          <div className="layout1">
            <div className="images">
              <img src={notemeterialimage} alt="an image" />
            </div>

            {/* layout text start */}

            <div className="layout-text">
              <h2>Array data Structure</h2>
              <h3>Data Structure</h3>
              <p>10:30 pm</p>
            </div>
            {/* layout text end */}







            <div className="btn">
              <button>View</button>
            </div>
          </div>

          {/* boxmodel end */}





          <div className="layout2">
            <div className="images">
              <img src={notemeterialimage} alt="an image" />
            </div>

            {/* layout text start */}

            <div className="layout-text">
              <h2>Array data Structure</h2>
              <h3>Data Structure</h3>
              <p>10:30 pm</p>
            </div>
            {/* layout text end */}








            <div className="btn">
              <button>View</button>
            </div>
          </div>
        </div>
        {/* assign ment part  */}

        <div className="assignment">
          {/* task managment */}

          <div className="meterial-assignment">
            <h1>Tasks & Assignments</h1>
            <a href="">see all</a>
          </div>

          {/* box model start 3 */}
          <div className="assi-layout">
            <div className="layout1">
              <div className="images">
                <img src={notemeterialimage} alt="an image" />
              </div>

              {/* layout text start */}

              <div className="layout-text">
                <h2>Discrete Mathematics</h2>
                <h3>Data Structure</h3>
                {/* icons  */}
                <div className="assi-icon">
                  <img src={assignmenticon} alt="" />
                  <p>Assignment Ca1</p>
                </div>
              </div>
              {/* layout text end */}






              <div className="btn">
                <button>Submit</button>
              </div>
            </div>

            {/* box model end  4 */}



{/* box model start 4 */}

          </div>
          <div className="assi-layout">
            <div className="layout1">
              <div className="images">
                <img src={notemeterialimage} alt="an image" />
              </div>

              {/* layout text start  */}

              <div className="layout-text">
                <h2>Discrete Mathematics</h2>
                <h3>Data Structure</h3>
                {/* icons  */}
                <div className="assi-icon">
                  <img src={assignmenticon} alt="" />
                  <p>Assignment Ca1</p>
                </div>
              </div>
              {/* layout text end */}

              <div className="btn">
                <button>Submit</button>
              </div>
            </div>

            {/* box model end  */}


          </div>
        </div>
      </div>
    </>
  );
}
