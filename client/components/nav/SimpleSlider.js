import React, { Component } from "react";
import Slider from "react-slick";
import Link from "next/link";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="">
        <Slider {...settings}>
          <div>
            <section>
              <div
                style={{
                  backgroundColor: "rgb(241 245 249)",
                  marginTop: "12px",
                }}
              >
                <div className="row">
                  <div className="col-md-8 bg-slate-500">
                    {" "}
                    <img
                      src="/images/b.png"
                      alt=""
                      className="w-full h-48 sm:h-56 object-cover"
                      style={{ height: "500px" }}
                    />
                  </div>
                  <div
                    className="col-md-4 bg-slate-500"
                    style={{ paddingRight: "80px", marginTop: "-16px" }}
                  >
                    <h1
                      className="text-6xl font-semibold text-center"
                      style={{
                        marginTop: "170px",
                        fontSize: "70px",
                        marginBottom: "40px",
                        color: "#407bff",
                      }}
                    >
                      E-Learning
                    </h1>
                    <h1
                      className="text-3xl font-semibold text-dark text-center"
                      style={{ fontSize: "50px", marginBottom: "40px" }}
                    >
                      Online Courses
                    </h1>
                    <div className="text-center">
                      <Link href="/listcourses">
                        <button className="text-right w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                          Get started
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div>
            <section>
              <div
                style={{
                  backgroundColor: "rgb(241 245 249)",
                  marginTop: "12px",
                }}
              >
                <div className="row">
                  <div
                    className="col-md-4 bg-slate-500"
                    style={{ paddingLeft: "80px", marginTop: "-16px" }}
                  >
                    <h1
                      className="text-6xl font-semibold text-center"
                      style={{
                        marginTop: "170px",
                        fontSize: "70px",
                        marginBottom: "40px",
                        color: "#407bff",
                      }}
                    >
                      E-Learning
                    </h1>
                    <h1
                      className="text-3xl font-semibold text-dark text-center"
                      style={{ fontSize: "50px", marginBottom: "40px" }}
                    >
                      Online Courses
                    </h1>
                    <div className="text-center">
                      <Link href="/listcourses">
                        <button className="text-right w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                          Get started
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-8 bg-slate-500">
                    {" "}
                    <img
                      src="/images/d.png"
                      alt=""
                      className="w-full h-48 sm:h-56 object-cover"
                      style={{ height: "500px" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Slider>
      </div>
    );
  }
}
