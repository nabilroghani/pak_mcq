"use client";

// import api from "../utils/api";
// import React, { useState, useEffect } from "react";
// import { FiMessageCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
// import { useParams, usePathname } from "next/navigation";
// import MCQComments from "../views/MCQComments";

// export default function MCQs_Cart_leftSide({ className = "", categorySlug }) {
//   const [mcqs, setMcqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [currentPage, setCurrentPage] = useState(1);
//   const [currentPage, setCurrentPage] = useState(() => {
//   const savedPage = localStorage.getItem(`lastPage_${categoryName || categorySlug}`);
//   return savedPage ? parseInt(savedPage) : 1;
// });
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [quizMode, setQuizMode] = useState(false);
//   const [userAnswers, setUserAnswers] = useState({});

//   const mcqsPerPage = 10;
//   const { categoryName } = useParams();
//   const pathname = usePathname();

//   useEffect(() => {
//     const fetchMCQs = async () => {
//       try {
//         setLoading(true);
//         const searchParams = new URLSearchParams("");
//         const searchQuery = searchParams.get("q");
//         const params = {};
//         if (searchQuery) params.search = searchQuery.trim();
//         else params.category = (categoryName || categorySlug)?.toLowerCase().trim();

//         const res = await api.get(`/mcqs/all`, { params });
//         if (res.data.success) { setMcqs(res.data.data); setCurrentPage(1); }
//       } catch (err) { console.error(err); }
//       finally { setLoading(false); }
//     };
//     fetchMCQs();
//   }, [categoryName, categorySlug, ""]);

//   const handleOptionClick = (mcqId, label) => {
//     if (!quizMode || userAnswers[mcqId]) return;
//     setUserAnswers((prev) => ({ ...prev, [mcqId]: label }));
//   };

//   const indexOfLastMCQ = currentPage * mcqsPerPage;
//   const indexOfFirstMCQ = indexOfLastMCQ - mcqsPerPage;
//   const currentMCQs = mcqs.slice(indexOfFirstMCQ, indexOfLastMCQ);
//   const totalPages = Math.ceil(mcqs.length / mcqsPerPage);

//   // const goToPage = (pageNumber) => {
//   //   if (pageNumber >= 1 && pageNumber <= totalPages) {
//   //     setCurrentPage(pageNumber);
//   //     window.scrollTo(0, 400);
//   //   }
//   // };

//   const goToPage = (pageNumber) => {
//   if (pageNumber >= 1 && pageNumber <= totalPages) {
//     setCurrentPage(pageNumber);
//     // User ki progress save karne ke liye:
//     localStorage.setItem(`lastPage_${categoryName || categorySlug}`, pageNumber);
//     window.scrollTo(0, 400);
//   }
// };

//   if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;

//   return (
//     <div className={`w-full min-w-0 mx-0 px-0 ${className}`}>
//       <div className="w-full flex justify-between items-center mb-6 px-2 py-3 md:p-4 bg-white rounded-none md:rounded-xl shadow-sm border border-blue-100 mx-0">
//         <h2 className="font-bold text-slate-700 text-sm md:text-base">{quizMode ? "🎯 Quiz Mode" : "📖 Reading Mode"}</h2>
//         <button
//           onClick={() => { setQuizMode(!quizMode); setUserAnswers({}); }}
//           className={`px-4 py-2 rounded-lg font-bold text-white text-xs md:text-sm ${quizMode ? "bg-orange-500" : "bg-blue-600"}`}
//         >
//           {quizMode ? "Switch MCQS Mode" : "Switch QUIZ Mode"}
//         </button>
//       </div>

//       {currentMCQs.map((item, index) => {
//         const selected = userAnswers[item._id];
//         const dbCorrectValue = item.correctAnswer?.trim();
//         const questionNumber = indexOfFirstMCQ + index + 1;

//         return (
//           <div key={item._id} className="w-full bg-white shadow-md rounded-none md:rounded-xl px-2 py-3 md:p-6 mb-5 border border-gray-100 mx-0">
//             <div className="mb-4">
//               <p className="text-gray-900 font-bold pl-2 text-base md:text-lg leading-tight">
//                 {questionNumber}. {item.question}
//               </p>
//             </div>

//             <div className="space-y-2 mb-4">
//               {item.options.map((option, idx) => {
//                 const label = String.fromCharCode(65 + idx);
//                 const isThisCorrect = (dbCorrectValue?.toUpperCase() === label) || (dbCorrectValue === option.trim());
//                 const isThisSelected = label === selected;

//                 let style = "border-gray-200";
//                 if (!quizMode && isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0] font-bold";
//                 else if (quizMode && selected) {
//                   if (isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0]";
//                   else if (isThisSelected) style = "bg-red-500 text-white border-red-500";
//                 }

//                 return (
//                   <div key={idx} onClick={() => handleOptionClick(item._id, label)} className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${style}`}>
//                     <span className="font-black w-6 shrink-0">{label}.</span>
//                     <span className="flex-1 text-sm md:text-base leading-tight">{option}</span>

//                     {quizMode && selected && isThisCorrect && (
//                       <FiCheckCircle className="text-white ml-2 self-center shrink-0" size={18} />
//                     )}
//                     {quizMode && isThisSelected && !isThisCorrect && (
//                       <FiXCircle className="text-white ml-2 self-center shrink-0" size={18} />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="bg-gray-50 p-2 rounded-lg flex justify-between items-center text-[10px] text-gray-500">
//               <span className="truncate">Category: {item.category}</span>
//               <div onClick={() => setActiveCommentId(activeCommentId === item._id ? null : item._id)} className="text-blue-600 font-bold cursor-pointer shrink-0">
//                 <FiMessageCircle className="inline mr-1" /> Comments
//               </div>
//             </div>

//             {item.explanation && (
//               <details className="mt-3 text-xs md:text-sm" open={!quizMode}>
//                 <summary className="cursor-pointer font-bold text-blue-600">Explanation</summary>
//                 <p className="mt-2 bg-blue-50 p-3 rounded italic">{item.explanation}</p>
//               </details>
//             )}

//             {activeCommentId === item._id && <div className="mt-4 border-t pt-3"><MCQComments mcqId={item._id} /></div>}
//           </div>
//         );
//       })}

//       {/* Pagination Section */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex flex-col items-center gap-4 px-2">
//           <div className="flex flex-wrap justify-center items-center gap-2">
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
//             >
//               Prev
//             </button>

//             <div className="flex flex-wrap justify-center gap-1.5">
//               {Array.from({ length: totalPages }, (_, i) => {
//                 const pageNum = i + 1;
//                 if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
//                   return null;
//                 }
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => goToPage(pageNum)}
//                     className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
//                         ? "bg-blue-600 text-white shadow-md scale-105"
//                         : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>

//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//                               {/* Manual Page Jump */}
// <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
//   <span className="text-xs font-bold">Go to Page:</span>
//   <input 
//     type="number" 
//     min="1"
//     max={totalPages}
//     placeholder={currentPage}
//     className="w-16 p-1 border rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
//     onKeyDown={(e) => {
//       if (e.key === 'Enter') {
//         const val = parseInt(e.target.value);
//         if (val >= 1 && val <= totalPages) {
//           goToPage(val);
//           e.target.value = ""; 
//         } else {
//           alert(`Please enter a page between 1 and ${totalPages}`);
//         }
//       }
//     }}
//   />
// </div>
//     </div>
//   );
// }
"use client";

import api from "../utils/api";
import React, { useState, useEffect } from "react";
import { FiMessageCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useParams } from "next/navigation";
import MCQComments from "../views/MCQComments";

export default function MCQs_Cart_leftSide({ className = "", categorySlug }) {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchError, setFetchError] = useState("");

  const { categoryName } = useParams();
  const categoryKey = (categoryName || categorySlug)?.toLowerCase().trim();
  const mcqsPerPage = 10;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("q") || "";
    setSearchQuery(q);
  }, [categoryKey]);

  useEffect(() => {
    if (!categoryKey || typeof window === "undefined") return;
    const savedPage = localStorage.getItem(`lastPage_${categoryKey}`);
    if (savedPage) setCurrentPage(parseInt(savedPage, 10));
  }, [categoryKey]);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        setLoading(true);
        setFetchError("");
        const params = {};

        if (searchQuery) params.search = searchQuery.trim();
        else if (categoryKey) params.category = categoryKey;

        const res = await api.get(`/mcqs/all`, { params });
        if (res.data.success) {
          setMcqs(res.data.data);
          const savedPage = localStorage.getItem(`lastPage_${categoryKey}`);
          setCurrentPage(savedPage ? parseInt(savedPage, 10) : 1);
        }
      } catch (err) {
        console.error(err);
        setFetchError("Could not load MCQs. Make sure the backend server is running.");
        setMcqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMCQs();
  }, [categoryName, categorySlug, categoryKey, searchQuery]);

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
      localStorage.setItem(`lastPage_${categoryKey}`, pageNumber);
      window.scrollTo(0, 400);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className={`w-full min-w-0 mx-0 px-0 ${className}`}>
      <div className="w-full flex justify-between items-center mb-6 px-4 py-4 md:px-6 md:py-5 bg-white rounded-none md:rounded-2xl shadow-md border border-x-0 md:border border-slate-100 mx-0">
        <h2 className="font-black text-slate-700 text-sm md:text-base uppercase tracking-wide">
          {quizMode ? "🎯 Quiz Mode" : "📖 Reading Mode"}
        </h2>
        <button
          onClick={() => { setQuizMode(!quizMode); setUserAnswers({}); }}
          className={`px-5 py-2.5 rounded-xl font-bold text-white text-xs md:text-sm shadow-sm transition-all active:scale-95 ${quizMode ? "bg-orange-500 hover:bg-orange-600" : "bg-[#1565C0] hover:bg-blue-700"}`}
        >
          {quizMode ? "Switch MCQS Mode" : "Switch QUIZ Mode"}
        </button>
      </div>

      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold text-center">
          {fetchError}
        </div>
      )}

      {!fetchError && mcqs.length === 0 && (
        <div className="mb-6 p-8 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-center">
          <p className="font-bold text-lg mb-1">No MCQs found</p>
          <p className="text-sm">Try a sub-category from the list above, or check back later.</p>
        </div>
      )}

      {currentMCQs.map((item, index) => {
        const selected = userAnswers[item._id];
        const dbCorrectValue = item.correctAnswer?.trim();
        const questionNumber = indexOfFirstMCQ + index + 1;

        return (
          <div key={item._id} className="w-full bg-white shadow-md rounded-none md:rounded-xl px-2 py-3 md:p-6 mb-5 border border-gray-100 mx-0">
            <div className="mb-4">
              <p className="text-gray-900 font-bold pl-2 text-base md:text-lg leading-tight">
                {questionNumber}. {item.question}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              {item.options.map((option, idx) => {
                const label = String.fromCharCode(65 + idx);
                const isThisCorrect = (dbCorrectValue?.toUpperCase() === label) || (dbCorrectValue === option.trim());
                const isThisSelected = label === selected;

                let style = "border-gray-200";
                if (!quizMode && isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0] font-bold";
                else if (quizMode && selected) {
                  if (isThisCorrect) style = "bg-[#1565C0] text-white border-[#1565C0]";
                  else if (isThisSelected) style = "bg-red-500 text-white border-red-500";
                }

                return (
                  <div key={idx} onClick={() => handleOptionClick(item._id, label)} className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${style}`}>
                    <span className="font-black w-6 shrink-0">{label}.</span>
                    <span className="flex-1 text-sm md:text-base leading-tight">{option}</span>

                    {quizMode && selected && isThisCorrect && (
                      <FiCheckCircle className="text-white ml-2 self-center shrink-0" size={18} />
                    )}
                    {quizMode && isThisSelected && !isThisCorrect && (
                      <FiXCircle className="text-white ml-2 self-center shrink-0" size={18} />
                    )}
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

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4 px-2">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              Prev
            </button>

            <div className="flex flex-wrap justify-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
                  return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              Next
            </button>
          </div>

          {/* Manual Page Jump - Responsive & No Alerts */}
          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xs font-bold">Go to Page:</span>
                <div className="relative flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    placeholder={currentPage}
                    id="jumpInput"
                    className="w-16 p-2 border-2 border-blue-100 rounded-lg text-center text-xs font-bold focus:border-blue-500 outline-none transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = parseInt(e.target.value);
                        if (val >= 1 && val <= totalPages) {
                          goToPage(val);
                          e.target.value = "";
                          document.getElementById('pageError').classList.add('hidden');
                        } else {
                          document.getElementById('pageError').classList.remove('hidden');
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('jumpInput');
                      const val = parseInt(input.value);
                      if (val >= 1 && val <= totalPages) {
                        goToPage(val);
                        input.value = "";
                        document.getElementById('pageError').classList.add('hidden');
                      } else {
                        document.getElementById('pageError').classList.remove('hidden');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all"
                  >
                    GO
                  </button>
                </div>
              </div>

              {/* Alert ki jagah ye error message dikhega */}
              <p id="pageError" className="hidden text-[10px] font-bold text-red-500 animate-pulse">
                ❌ Invalid Page! Range: 1 to {totalPages}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}