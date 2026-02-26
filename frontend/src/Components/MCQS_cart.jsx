import React from "react";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

export default function MCQS_cart() {
  return (
    <div className="min-h-screen px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-5 items-start">
        {/* LEFT SIDE */}
        <div className="w-full">
          <MCQs_Cart_leftSide />
        </div>

        {/* RIGHT SIDE */}
        <div className=" mt-10 lg:mt-0">
          <MCQs_cart_RightSide />
        </div>
      </div>
    </div>
  );
}
