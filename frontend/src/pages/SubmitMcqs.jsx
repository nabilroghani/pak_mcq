import React, { useState } from 'react';
import { FaCloudUploadAlt, FaCheckCircle, FaListUl, FaInfoCircle } from 'react-icons/fa';

const SubmitMCQS = () => {
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    explanation: ''
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-4 tracking-tighter">
            CONTRIBUTE <span className="text-cyan-500">MCQS</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">Help other students by sharing quality preparation material.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Side: Guidelines (1 Column) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-950 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaInfoCircle className="text-cyan-400" /> Guidelines
              </h3>
              
              <ul className="space-y-4 opacity-90">
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  Ensure the question is clear and grammatically correct.
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  Provide four distinct options for each question.
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  Double-check the correct answer before submitting.
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  Avoid duplicate questions already available on PakLearners.
                </li>
              </ul>

              <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 italic text-xs text-blue-200">
                "Knowledge increases by sharing, not by saving."
              </div>
            </div>
          </div>

          {/* Right Side: Submission Form (2 Columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
              <form className="space-y-6">
                
                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-blue-950 uppercase tracking-widest flex items-center gap-2">
                    <FaListUl className="text-cyan-500" /> Select Category
                  </label>
                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all appearance-none">
                    <option>General Knowledge</option>
                    <option>Pakistan Studies</option>
                    <option>Islamic Studies</option>
                    <option>Everyday Science</option>
                    <option>Computer Science</option>
                  </select>
                </div>

                {/* Question Input */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-blue-950 uppercase tracking-widest">The Question</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter your MCQ question here..." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['A', 'B', 'C', 'D'].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Option {label}</label>
                      <input 
                        type="text" 
                        placeholder={`Enter option ${label}`}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer & Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-blue-950 uppercase tracking-widest text-cyan-600">Correct Answer</label>
                    <select className="w-full px-5 py-4 bg-cyan-50 border border-cyan-100 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10">
                      <option>Option A</option>
                      <option>Option B</option>
                      <option>Option C</option>
                      <option>Option D</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-blue-950 uppercase tracking-widest">Short Explanation</label>
                    <input 
                      type="text" 
                      placeholder="Optional explanation..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-blue-950 hover:bg-cyan-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-950/20 flex items-center justify-center gap-3 transition-all duration-300 group">
                  <FaCloudUploadAlt className="text-2xl group-hover:-translate-y-1 transition-transform" />
                  SUBMIT MCQ FOR REVIEW
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubmitMCQS;