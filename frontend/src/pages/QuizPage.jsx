import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaArrowRight } from "react-icons/fa";

export default function QuizPage() {
  const { categoryName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        // Formating category for API
        const formattedCat = (categoryName === "General" || !categoryName) ? "" : categoryName.replace(/-/g, ' ');
        const res = await axios.get(`http://localhost:5000/api/mcqs/all?category=${formattedCat}`);
        
        if (res.data.success) {
          let allData = res.data.data;

          // --- NO REPEAT LOGIC ---
          const storageKey = `seen_mcqs_${categoryName}`;
          const seenIds = JSON.parse(localStorage.getItem(storageKey)) || [];

          // Filter unseen ones
          let unseen = allData.filter(q => !seenIds.includes(q._id));

          // Agar saare dekh liye hain, to restart kar do (clear history)
          if (unseen.length < 5) {
            localStorage.removeItem(storageKey);
            unseen = allData;
          }

          // Shuffle unseen and take 10
          const shuffled = unseen.sort(() => 0.5 - Math.random()).slice(0, 10);
          setQuestions(shuffled);
        }
        setLoading(false);
      } catch (err) {
        console.error("Quiz Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [categoryName]);

  const handleAnswer = (option, index) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);

    const currentQ = questions[currentIndex];
    const userSelectedLetter = String.fromCharCode(65 + index);
    const dbAnswer = currentQ.correctAnswer.trim();

    // Matching Logic
    const isMatch = (userSelectedLetter === dbAnswer.toUpperCase()) || 
                    (option.trim().toLowerCase() === dbAnswer.toLowerCase());

    if (isMatch) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Save this question as 'seen'
    const storageKey = `seen_mcqs_${categoryName}`;
    const seenIds = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (!seenIds.includes(currentQ._id)) {
      localStorage.setItem(storageKey, JSON.stringify([...seenIds, currentQ._id]));
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
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      <p className="mt-4 font-bold text-gray-600 italic">Finding new questions for you...</p>
    </div>
  );

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-10 bg-white shadow-2xl rounded-3xl text-center border border-gray-100">
        <FaTrophy className="text-yellow-400 text-7xl mx-auto mb-4" />
        <h2 className="text-3xl font-black text-gray-800 mb-2">Quiz Finished!</h2>
        <div className="bg-blue-50 p-6 rounded-2xl my-6">
          <p className="text-gray-600 text-lg">Your Score</p>
          <h3 className="text-5xl font-black text-blue-600">{score} / {questions.length}</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">Try New Questions</button>
          <Link to="/" className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">Go Home</Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 sm:p-10 bg-white shadow-2xl rounded-[2.5rem] border border-gray-50">
      <div className="flex justify-between items-end mb-4">
        <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Question {currentIndex + 1}/{questions.length}</span>
        <span className="text-gray-400 text-xs font-bold uppercase">{categoryName?.replace(/-/g, ' ')} Mode</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-3 rounded-full mb-10 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full transition-all duration-700" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-10 leading-relaxed">{currentQ?.question}</h2>

      <div className="grid grid-cols-1 gap-4">
        {currentQ?.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isThisSelected = selectedOption === option;
          const isThisCorrect = letter === currentQ.correctAnswer.trim().toUpperCase() || option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleAnswer(option, idx)}
              className={`p-5 text-left border-2 rounded-2xl transition-all flex items-center justify-between ${
                selectedOption === null 
                  ? "border-gray-100 hover:border-blue-500 hover:bg-blue-50 shadow-sm" 
                  : isThisSelected 
                    ? (isCorrect ? "border-green-500 bg-green-50 shadow-inner" : "border-red-500 bg-red-50 shadow-inner")
                    : (isThisCorrect ? "border-green-500 bg-green-50" : "border-gray-50 opacity-40")
              }`}
            >
              <div className="flex items-center">
                <span className={`w-9 h-9 flex items-center justify-center rounded-xl font-black mr-4 ${isThisSelected ? "bg-white text-blue-600" : "bg-gray-100 text-gray-400"}`}>{letter}</span>
                <span className="font-bold text-gray-700">{option}</span>
              </div>
              {isThisSelected && (isCorrect ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />)}
              {!isCorrect && selectedOption !== null && isThisCorrect && <FaCheckCircle className="text-green-500 opacity-50" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}