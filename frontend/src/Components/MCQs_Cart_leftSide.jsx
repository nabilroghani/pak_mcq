import React, { useState, useEffect } from "react";
import { FiMessageCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import MCQComments from "../pages/MCQComments";

export default function MCQs_Cart_leftSide({ className = "" }) {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const mcqsPerPage = 10;
  const { categoryName } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        setLoading(true);
        setMcqs([]);
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("q");
        const params = {};

        if (searchQuery && searchQuery.trim() !== "") {
          params.search = searchQuery.trim();
        } else if (categoryName && categoryName !== "search") {
          params.category = categoryName.toLowerCase().trim();
        }

        const res = await axios.get(`http://localhost:5000/api/mcqs/all`, { params });
        if (res.data.success) {
          setMcqs(res.data.data);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMCQs();
  }, [categoryName, location.search]);

  const handleOptionClick = (mcqId, label) => {
    if (!quizMode || userAnswers[mcqId]) return;
    setUserAnswers((prev) => ({ ...prev, [mcqId]: label }));
  };

  const indexOfLastMCQ = currentPage * mcqsPerPage;
  const indexOfFirstMCQ = indexOfLastMCQ - mcqsPerPage;
  const currentMCQs = mcqs.slice(indexOfFirstMCQ, indexOfLastMCQ);
  const totalPages = Math.ceil(mcqs.length / mcqsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 font-bold text-gray-500">Loading MCQs...</span>
      </div>
    );
  }

  const queryInUrl = new URLSearchParams(location.search).get("q");

  return (
    <div className={`w-full ${className}`}>
      {/* Quiz Mode Toggle Header */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
        <h2 className="font-bold text-slate-700">{quizMode ? "🎯 Quiz Mode" : "📖 Reading Mode"}</h2>
        <button
          onClick={() => { setQuizMode(!quizMode); setUserAnswers({}); }}
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            quizMode ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {quizMode ? "Exit Quiz Mode" : "Start Quiz Mode"}
        </button>
      </div>

      {queryInUrl && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
          Showing results for: <strong>"{queryInUrl}"</strong>
          <span className="ml-2">({mcqs.length} found)</span>
        </div>
      )}

      {currentMCQs.length > 0 ? (
        currentMCQs.map((item) => {
          const selected = userAnswers[item._id];
          const dbCorrectValue = item.correctAnswer?.trim();

          return (
            <div key={item._id} className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100 transition-all duration-300">
              <div className="mb-4">
                <p className="text-gray-900 font-semibold text-lg">{item.question}</p>
              </div>

              <div className="space-y-2 mb-4">
                {item.options.map((option, index) => {
                  const label = String.fromCharCode(65 + index);
                  const currentOptionText = option.trim();
                  const isThisCorrect = (dbCorrectValue?.toUpperCase() === label) || (dbCorrectValue === currentOptionText);
                  const isThisSelected = label === selected;

                  let style = "border-gray-200 hover:bg-[#1565C0] hover:text-white";
                  if (!quizMode) {
                    if (isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0] font-bold shadow-md";
                  } else if (quizMode && selected) {
                    if (isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0] font-bold";
                    else if (isThisSelected) style = "bg-red-500 text-white border-red-500";
                  }

                  return (
                    <div key={index} onClick={() => handleOptionClick(item._id, label)} className={`group flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${style}`}>
                      <span className="font-bold w-8">{label}.</span>
                      <span className="flex-1">{option}</span>
                      {quizMode && selected && isThisCorrect && <FiCheckCircle className="ml-2 text-white text-lg" />}
                      {quizMode && isThisSelected && !isThisCorrect && <FiXCircle className="ml-2 text-white text-lg" />}
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center text-[11px] text-gray-500 italic">
                <span>Category: {item.category} | Submitted by: {item.createdBy?.name || "Admin"}</span>
                <div onClick={() => setActiveCommentId(activeCommentId === item._id ? null : item._id)} className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline text-sm font-bold">
                  <FiMessageCircle /> Comments
                </div>
              </div>

              {item.explanation && (
                <details className="mt-3 text-sm text-gray-700" open={!quizMode}>
                  <summary className="cursor-pointer font-medium text-blue-600 hover:underline">View Explanation</summary>
                  <p className="mt-2 bg-blue-50 p-3 rounded border border-blue-100 italic">{item.explanation}</p>
                </details>
              )}

              {activeCommentId === item._id && (
                <div className="mt-4 border-t pt-3">
                  <MCQComments mcqId={item._id} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow border border-dashed border-gray-300">
          <p className="text-xl text-gray-400 font-medium">No MCQs found.</p>
        </div>
      )}

      {/* Pagination Section - FIXED LOCATION */}
      {totalPages > 1 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition font-medium">Previous</button>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => goToPage(i + 1)} className={`px-4 py-2 min-w-[42px] rounded-lg transition-all font-bold ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-md scale-110" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{i + 1}</button>
              ))}
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition font-medium">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}