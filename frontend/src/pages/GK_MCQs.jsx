import React from "react";
import MCQs_cart_RightSide from "../Components/MCQs_cart_RightSide";
import MCQs_Cart_leftSide from "../Components/MCQs_Cart_leftSide";

export default function GK_MCQs() {
  return (
    <div className="min-h-screen">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.2fr] gap-5 items-start">
        {/* ================= LEFT SIDE ================= */}
        <div className="rounded-2xl p-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            General Knowledge MCQs
          </h1>

          {/* Image */}
          <div className="overflow-hidden rounded-xl mb-6">
            <img
              src="https://pakmcqs.com/wp-content/uploads/2017/10/General-Knowledge-mcqs-PakMcqs.com_-1024x538.jpg.webp"
              alt="General Knowledge MCQs"
              className="w-full h-56 md:h-80 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            <b>General Knowledge MCQs</b> consists of World Geography,
            Atmosphere, Science & Literature, Events MCQs, Current Affairs MCQs,
            Pakistan Affairs MCQs and International Organizations. These
            questions are very important for all types of exams conducted by
            FPSC, NTS, KPPSC, PPSC, SPSC, BPSC, OTS, UTS, PTS, CTS, ATS, ETEA
            and other testing agencies of Pakistan.
          </p>

          {/* Share Section */}
          <div className="p-6 mb-8 bg-white rounded-xl shadow-sm">
            <p className="font-semibold text-gray-700 mb-4">Share</p>

            <button className="w-full md:w-auto bg-gray-100 px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300">
              GENERAL KNOWLEDGE ONLINE QUIZ TEST
            </button>

            <div className="mt-4 flex flex-col md:flex-row gap-4 md:items-center">
              <p className="text-gray-600">
                Now you can submit latest General Knowledge MCQs.
              </p>

              <button className="font-bold rounded hover:text-green-800 transition duration-300">
                SUBMIT HERE
              </button>
            </div>
          </div>

          {/* Quiz Mode Section */}
          <div className="bg-blue-50 p-6 rounded-xl border mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Take the Quiz in Quiz Mode!
            </h2>

            <p className="text-gray-600 mb-6">
              <b>Ready to test your knowledge?</b> Click the button below and
              start your quiz adventure!
            </p>

            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
              QUIZ MODE
            </button>
          </div>

          {/* MCQs List */}
          <div className="rounded-xl">
            <MCQs_Cart_leftSide className="w-full" />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <MCQs_cart_RightSide className=" mt-20" />
      </div>
    </div>
  );
}
