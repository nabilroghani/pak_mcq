import React from 'react';
import quizBanner from "../assets/quiz.png"; 
import { mcqsData } from "../Data/Questions"; 

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

        {/* MCQS LIST - Automatically Generated */}
        <div className="space-y-8">
          {mcqsData.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Question Header */}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-950 text-white px-4 py-1 rounded-full text-xs font-black tracking-widest">
                    QUESTION {index + 1}
                  </span>
                  <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-blue-950 leading-tight mb-8">
                  {item.question}
                </h2>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {item.options.map((option, optIndex) => {
                    const label = String.fromCharCode(65 + optIndex); // A, B, C, D
                    return (
                      <div 
                        key={optIndex} 
                        className="group flex items-center p-4 bg-gray-50 border-2 border-transparent hover:border-cyan-500 hover:bg-cyan-50 rounded-2xl transition-all cursor-pointer"
                      >
                        <span className="w-10 h-10 flex items-center justify-center bg-blue-950 text-white rounded-xl font-bold mr-4 group-hover:bg-cyan-500 transition-colors">
                          {label}
                        </span>
                        <p className="text-gray-700 font-semibold md:text-lg">{option}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Show Answer Section (Optional) */}
              <div className="bg-blue-50/50 p-4 border-t border-gray-50 text-center">
                 <button className="text-blue-950/40 text-xs font-black uppercase tracking-[0.2em] hover:text-cyan-600 transition-colors">
                    Click to show correct answer
                 </button>
              </div>
            </div>
          ))}
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