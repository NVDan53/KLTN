import React from "react";
import Testimoni from "./Testimoni";

const Pricing = () => {
  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="">
        <div className="container" id="testimoni">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
            Trusted by Thousands of Happy Customer{" "}
          </h3>

          <div className="w-full flex flex-col py-12">
            <Testimoni />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
