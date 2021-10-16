import React from "react";
import "./Textsection.scss";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

const Textsection = () =>{
    return(
        
<div className="container">
  
       
        <div className="dispay-flex2">
       
        <img className="chat-image2" src={image3} alt="image3" />
        <p class="text2">
        starts now</p> 
        <div className="time2">9:31am</div>
        </div>

        <div className="dispay-flex3">
      
        <p class="text3">
        no problem </p>
        <img className="chat-image1" src={image3} alt="image3" />
        <div className="time3">9:31am</div>
        </div>

        <div className="dispay-flex4">
    
        <img className="chat-image2" src={image2} alt="image2" />
        <p class="text4">
        ok bro
       
        </p>
        <div className="time4">9:31am</div>
    
    
        </div>

        <div className="dispay-flex5">
       
        <p class="text5">
            nothing bro</p>
            <img className="chat-image1" src={image3} alt="image3" />
        <div className="time5">9:31am</div>
     
        </div>

        </div>

    )
}
export default Textsection;