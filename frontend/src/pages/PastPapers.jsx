import React from 'react';
import quizBanner from "../assets/quiz.png"; 

const PastPapers = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* TOP HERO BANNER */}
        <div className="relative w-full h-[200px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img 
            src={quizBanner} 
            alt="Quiz Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent flex items-end p-8 md:p-12">
            <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter">
              PAST PAPERS <span className="text-cyan-400">COLLECTION</span>
            </h1>
          </div>
        </div>


        {/* BOTTOM FOOTER */}
        <div className="text-center pt-10">
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
              End of collection - More questions coming soon
            </p>
        </div>

      </div>
    </div>
  );
};

export default PastPapers;