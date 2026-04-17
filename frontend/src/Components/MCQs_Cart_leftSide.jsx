import React, { useState, useEffect } from "react";
import { FiMessageCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import MCQComments from "../pages/MCQComments";

export default function MCQs_Cart_leftSide({ className = "", categorySlug }) {
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
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("q");
        const params = {};
        if (searchQuery) params.search = searchQuery.trim();
        else params.category = (categoryName || categorySlug)?.toLowerCase().trim();

        const res = await axios.get(`http://localhost:5000/api/mcqs/all`, { params });
        if (res.data.success) { setMcqs(res.data.data); setCurrentPage(1); }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchMCQs();
  }, [categoryName, categorySlug, location.search]);

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
      window.scrollTo(0, 400);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className={`w-full ${className}`}>
      {/* Header padding mobile par kam ki */}
      <div className="flex justify-between items-center mb-6 p-3 md:p-4 bg-white rounded-xl shadow-sm border border-blue-100 mx-1 md:mx-0">
        <h2 className="font-bold text-slate-700 text-sm md:text-base">{quizMode ? "🎯 Quiz Mode" : "📖 Reading Mode"}</h2>
        <button
          onClick={() => { setQuizMode(!quizMode); setUserAnswers({}); }}
          className={`px-4 py-2 rounded-lg font-bold text-white text-xs md:text-sm ${quizMode ? "bg-orange-500" : "bg-blue-600"}`}
        >
          {quizMode ? "Switch MCQS Mode" : "Switch QUIZ Mode"}
        </button>
      </div>

      {currentMCQs.map((item) => {
        const selected = userAnswers[item._id];
        const dbCorrectValue = item.correctAnswer?.trim();

        return (
          // Card padding p-4 mobile ke liye fix ki
          <div key={item._id} className="bg-white shadow-md rounded-xl p-4 md:p-6 mb-5 border border-gray-100 mx-1 md:mx-0">
            <div className="mb-4">
              <p className="text-gray-900 font-bold text-base md:text-lg leading-tight">{item.question}</p>
            </div>

            <div className="space-y-2 mb-4">
              {item.options.map((option, index) => {
                const label = String.fromCharCode(65 + index);
                const isThisCorrect = (dbCorrectValue?.toUpperCase() === label) || (dbCorrectValue === option.trim());
                const isThisSelected = label === selected;

                let style = "border-gray-200";
                if (!quizMode && isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0] font-bold";
                else if (quizMode && selected) {
                  if (isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0]";
                  else if (isThisSelected) style = "bg-red-500 text-white border-red-500";
                }

                return (
                  <div key={index} onClick={() => handleOptionClick(item._id, label)} className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${style}`}>
                    <span className="font-black w-6 shrink-0">{label}.</span>
                    <span className="flex-1 text-sm md:text-base leading-tight">{option}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-50 p-2 rounded-lg flex justify-between items-center text-[10px] text-gray-500">
              <span className="truncate">Category: {item.category}</span>
              <div onClick={() => setActiveCommentId(activeCommentId === item._id ? null : item._id)} className="text-blue-600 font-bold cursor-pointer shrink-0">
                <FiMessageCircle className="inline mr-1" /> Comments
              </div>
            </div>

            {item.explanation && (
              <details className="mt-3 text-xs md:text-sm" open={!quizMode}>
                <summary className="cursor-pointer font-bold text-blue-600">Explanation</summary>
                <p className="mt-2 bg-blue-50 p-3 rounded italic">{item.explanation}</p>
              </details>
            )}

            {activeCommentId === item._id && <div className="mt-4 border-t pt-3"><MCQComments mcqId={item._id} /></div>}
          </div>
        );
      })}

      {/* Pagination Mobile Responsive */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 px-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i+1} onClick={() => goToPage(i+1)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentPage === i+1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              {i+1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}