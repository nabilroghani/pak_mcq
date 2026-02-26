import React from "react";
import MCQs_cart_RightSide from "../Components/MCQs_cart_RightSide";
import MCQs_Cart_leftSide from "../Components/MCQs_Cart_leftSide";

// Humne props pass kiye hain: title, description, image, aur quizLink
export default function MCQPageLayout({ title, description, image, quizLink }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.1fr] gap-8 items-start">
        
        {/* LEFT SIDE */}
        <div className="rounded-2xl p-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {title}
          </h1>

          <div className="overflow-hidden rounded-xl mb-6">
            <img
              src={image}
              alt={title}
              className="w-full h-56 md:h-80 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {description}
          </p>

          <div className="p-6 mb-8 bg-white rounded-xl shadow-sm">
            <p className="font-semibold text-gray-700 mb-4">Share</p>
            <button className="w-full md:w-auto bg-gray-100 px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300 uppercase">
              {title} ONLINE QUIZ TEST
            </button>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Take the Quiz in Quiz Mode!
            </h2>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
              QUIZ MODE
            </button>
          </div>

          <MCQs_Cart_leftSide className="w-full" />
        </div>

        {/* RIGHT SIDE */}
        <MCQs_cart_RightSide className=" mt-20" />
      </div>
    </div>
  );
}