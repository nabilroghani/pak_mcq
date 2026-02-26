import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import MCQComments from "../pages/MCQComments";

export default function MCQs_Cart_leftSide({ className = "" }) {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCommentId, setActiveCommentId] = useState(null);
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

        // 1. Agar Search Query hai (Priority)
        if (searchQuery && searchQuery.trim() !== "") {
          params.search = searchQuery.trim();
        } 
        // 2. Agar Search nahi hai aur Subject page par hain
        else if (categoryName && categoryName !== "search") {
          // Hyphens khatam karke extra spaces clean karna zaroori hai
          const cleanCategory = categoryName
            .replace(/-/g, ' ')
            .replace(/\s+/g, ' ') 
            .trim();
          params.category = cleanCategory;
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

  // Pagination Logic
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
      {/* Search Header - Only shows if actually searching */}
      {queryInUrl && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
          Showing results for: <strong>"{queryInUrl}"</strong>
          <span className="ml-2">({mcqs.length} found)</span>
        </div>
      )}

      {currentMCQs.length > 0 ? (
        currentMCQs.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 mb-6 border border-gray-100"
          >
            {/* Question */}
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-900 font-semibold text-lg">{item.question}</p>
              <div 
                onClick={() => setActiveCommentId(activeCommentId === item._id ? null : item._id)}
                className={`text-xl cursor-pointer hover:scale-110 transition-transform ${activeCommentId === item._id ? 'text-blue-700' : 'text-blue-500'}`}
              >
                <FiMessageCircle />
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {item.options.map((option, index) => (
                <div
                  key={index}
                  className="group flex items-center p-2 rounded-lg border border-gray-200 hover:bg-[#1565C0] cursor-pointer transition-colors"
                >
                  <span className="font-bold w-6 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="ml-2 text-gray-800 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </div>
              ))}
            </div>

            {/* Answer & Info */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-sm text-green-600 font-bold mb-1">
                Correct Answer: {item.correctAnswer}
              </p>
              <p className="text-[11px] text-gray-500 italic">
                Category: {item.category} | Submitted by: {item.createdBy?.name || "Admin"}
              </p>
            </div>

            {/* Explanation */}
            {item.explanation && (
              <details className="mt-3 text-sm text-gray-700">
                <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                  View Explanation
                </summary>
                <p className="mt-2 bg-blue-50 p-3 rounded border border-blue-100 italic">
                  {item.explanation}
                </p>
              </details>
            )}

            {/* Comment Section */}
            {activeCommentId === item._id && (
              <div className="mt-4 border-t pt-2 animate-in fade-in duration-300">
                <MCQComments mcqId={item._id} />
              </div>
            )}
          </div>
        ))
      ) : (
        /* Empty State - Context Aware */
        <div className="text-center py-20 bg-white rounded-xl shadow border border-dashed border-gray-300">
          <p className="text-xl text-gray-400 font-medium">
            {queryInUrl 
              ? `No MCQs matched your search for "${queryInUrl}".` 
              : `No MCQs found in ${categoryName?.replace(/-/g, ' ') || 'this category'}.`
            }
          </p>
          <button onClick={() => window.location.href = "/"} className="mt-4 text-blue-600 underline">
            Go back to Home
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition font-medium"
            >
              Previous
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 min-w-[42px] rounded-lg transition-all font-bold ${
                    currentPage === i + 1 
                      ? "bg-blue-600 text-white shadow-md scale-110" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}