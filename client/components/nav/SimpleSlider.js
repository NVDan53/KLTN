import React, { Component } from "react";
import Slider from "react-slick";



export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div>
        <Slider {...settings}>
          <div>
                <div style={{ height: "400px", width: "100%",
                    background:`url(/images/banner1.jpg) no-repeat center/ cover`}}>
                <div className="slider_header">
                    <h1 className="b">Don’t just browse the web — design it</h1> 
                    <p className="c">Learn Web Design, from user experience fundamentals to graphic design. Give your skills a reboot (and save).</p>   
                </div> 
                </div>     
          </div>

          <div>
                <div style={{ height: "400px", width: "100%",
                    background:`url(/images/banner1.jpg) no-repeat center/ cover`}}>
                <div className="slider_header">
                    <h1 className="b">Don’t just browse the web — design it</h1> 
                    <p className="c">Learn Web Design, from user experience fundamentals to graphic design. Give your skills a reboot (and save).</p>   
                </div> 
                </div>     
          </div>
         
        
         
        </Slider>
      </div>
    );
  }
}