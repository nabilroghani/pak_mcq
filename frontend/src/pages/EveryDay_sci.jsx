import React from "react";
import MCQs_cart_RightSide from "../Components/MCQs_cart_RightSide";
import MCQs_Cart_leftSide from "../Components/MCQs_Cart_leftSide";

export default function EveryDay_sci() {
  return (
    <div className="min-h-screen">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.2fr] gap-8 items-start">
        {/* ================= LEFT SIDE ================= */}
        <div className="p-4 rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Everyday Science MCQs
          </h1>

          {/* Image */}
          <div className="overflow-hidden rounded-xl mb-6">
            <img
              src="https://pakmcqs.com/wp-content/uploads/2017/10/Everyday-Science-mcqs-PakMcqs.com-copy.jpg.webp"
              alt="Everyday Science MCQs"
              className="w-full h-56 md:h-80 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            <b>Everyday Science MCQs</b>. Here you will find General Science
            Multiple Choice Questions from Biology, Chemistry, Physics and
            Atmospheric Studies. Everyday Science Online Test, MCQs Practice,
            Abbreviations, and Scientific Facts.
          </p>

          <p className="text-gray-800 bg-gray-100 p-3 font-bold inline-block rounded-xl transition duration-300 cursor-pointer mb-4">
            ISLAMIC STUDY MCQS
          </p>

          <div className="flex gap-5 mb-8">
            <p>Now you can also submit latest Everyday Science MCQs.</p>
            <button className="font-bold rounded hover:text-green-800 cursor-pointer transition duration-300">
              SUBMIT HERE
            </button>
          </div>

          {/* MCQs List */}
          <div className="rounded-xl mt-10">
            <MCQs_Cart_leftSide className="w-full" />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <MCQs_cart_RightSide className="mt-20" />
      </div>
    </div>
  );
}
