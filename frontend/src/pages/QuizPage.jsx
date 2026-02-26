import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTrophy } from "react-icons/fa";

export default function QuizPage() {
  const { categoryName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching & Shuffling
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const formattedCat = categoryName ? categoryName.replace(/-/g, ' ') : "";
        const res = await axios.get(`http://localhost:5000/api/mcqs/all?category=${formattedCat}`);
        
        if (res.data.success) {
          // Sawalon ko random order mein shuffle karna
          const shuffled = res.data.data.sort(() => 0.5 - Math.random());
          setQuestions(shuffled.slice(0, 10)); // Top 10 MCQs for quiz
        }
        setLoading(false);
      } catch (err) {
        console.error("Quiz Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [categoryName]);

  // 2. Answer Handling Logic (Score Fix)
 const handleAnswer = (option, index) => {
  if (selectedOption !== null) return;

  setSelectedOption(option);

  // 1. User ke election ki details
  const userSelectedLetter = String.fromCharCode(65 + index); // e.g., "A"
  const userSelectedText = option.trim().toLowerCase(); // e.g., "islamabad"

  // 2. Database ke answer ki details
  const dbAnswerRaw = questions[currentIndex].correctAnswer.trim();
  const dbAnswerCleanLetter = dbAnswerRaw.toUpperCase().replace(/[^A-Z]/g, ""); // e.g., "A"
  const dbAnswerCleanText = dbAnswerRaw.toLowerCase(); // e.g., "islamabad"

  // DEBUGGING: Console mein check karein ke kya match ho raha hai
  console.log("--- Quiz Check ---");
  console.log("User Letter:", userSelectedLetter, " vs DB Letter:", dbAnswerCleanLetter);
  console.log("User Text:", userSelectedText, " vs DB Text:", dbAnswerCleanText);

  // 3. Match Logic (Agar Letter match ho jaye YA poora Text match ho jaye)
  const isMatch = (userSelectedLetter === dbAnswerCleanLetter) || (userSelectedText === dbAnswerCleanText);

  if (isMatch) {
    setScore((prev) => prev + 1);
    setIsCorrect(true);
  } else {
    setIsCorrect(false);
  }

  setTimeout(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  }, 1200);
};

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
      <p className="mt-4 font-bold text-gray-600">Preparing your Quiz...</p>
    </div>
  );

  // 3. Result View
  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-10 bg-white shadow-2xl rounded-3xl text-center border border-gray-100">
        <FaTrophy className="text-yellow-400 text-7xl mx-auto mb-4" />
        <h2 className="text-3xl font-black text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 mb-6 font-medium">Great effort! Here is your final performance.</p>
        
        <div className="bg-blue-50 p-6 rounded-2xl mb-8">
          <p className="text-gray-600 text-lg">Final Score</p>
          <h3 className="text-5xl font-black text-blue-600">{score} <span className="text-2xl text-gray-400">/ {questions.length}</span></h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Try Again
          </button>
          <Link 
            to="/" 
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Exit Quiz
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-8 bg-white shadow-2xl rounded-3xl border border-gray-50 relative overflow-hidden">
      {/* Progress Header */}
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-2">
          <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Question {currentIndex + 1}/{questions.length}</span>
          <span className="text-gray-400 text-xs font-bold italic">Category: {categoryName?.replace(/-/g, ' ')}</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-gray-100 h-3 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQ?.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-4">
          {currentQ?.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isThisSelected = selectedOption === option;
            const isThisCorrect = letter === currentQ.correctAnswer.trim().toUpperCase();

            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(option, idx)}
                className={`group relative p-5 text-left border-2 rounded-2xl transition-all duration-200 flex items-center justify-between ${
                  selectedOption === null 
                    ? "border-gray-100 hover:border-blue-400 hover:bg-blue-50 shadow-sm" 
                    : isThisSelected 
                      ? (isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50")
                      : (letter === currentQ.correctAnswer.trim().toUpperCase() && selectedOption !== null ? "border-green-500 bg-green-50" : "border-gray-50 opacity-50")
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors ${
                    isThisSelected ? "bg-white" : "bg-gray-100 text-gray-500 group-hover:bg-blue-500 group-hover:text-white"
                  }`}>
                    {letter}
                  </span>
                  <span className={`font-semibold ${isThisSelected ? "text-gray-900" : "text-gray-700"}`}>
                    {option}
                  </span>
                </div>
                
                {/* Icons for Feedback */}
                {isThisSelected && (
                  isCorrect ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaTimesCircle className="text-red-500 text-xl" />
                )}
                {!isCorrect && selectedOption !== null && isThisCorrect && (
                   <FaCheckCircle className="text-green-500 text-xl opacity-50" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}