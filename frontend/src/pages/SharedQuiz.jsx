import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SharedQuiz() {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [copyStatus, setCopyStatus] = useState("Copy Link");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/quizzes/${slug}`)
             .then(res => setQuiz(res.data.quiz))
             .catch(err => console.error(err));
    }, [slug]);

    const handleOptionSelect = (qId, opt) => {
        if (!submitted) setUserAnswers({ ...userAnswers, [qId]: opt });
    };

    const calculateScore = () => {
        let s = 0;
        quiz.mcqs.forEach(m => {
            if (userAnswers[m._id] === (m.answer || m.correctAnswer)) s++;
        });
        setScore(s);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopyStatus("Copied! ✅");
        setTimeout(() => setCopyStatus("Copy Link"), 2000);
    };

    if (!quiz) return <div className="flex h-screen items-center justify-center font-bold text-indigo-600">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto my-6 px-4 pb-12 font-sans text-slate-800">
            {/* Minimal Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">{quiz.title}</h1>
                <div className="h-1 w-12 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Score Card (Only when submitted) */}
            {submitted && (
                <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl mb-8 text-center shadow-sm animate-in fade-in zoom-in duration-300">
                    <p className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-1">Your Result</p>
                    <h2 className="text-4xl font-black text-slate-900">{score} / {quiz.mcqs.length}</h2>
                    <div className="mt-4 flex justify-center gap-2">
                        <button onClick={copyToClipboard} className="text-xs bg-slate-100 px-4 py-2 rounded-full font-bold hover:bg-slate-200 transition-all">
                            🔗 {copyStatus}
                        </button>
                    </div>
                </div>
            )}

            {/* Compact Questions */}
            <div className="space-y-4">
                {quiz.mcqs.map((m, index) => {
                    const correctAns = m.answer || m.correctAnswer;
                    return (
                        <div key={m._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 flex gap-3">
                                <span className="text-slate-400">0{index + 1}</span>
                                {m.question}
                            </h3>

                            <div className="grid grid-cols-1 gap-2">
                                {m.options.map((opt, i) => {
                                    const isSelected = userAnswers[m._id] === opt;
                                    const isCorrect = submitted && opt === correctAns;
                                    const isWrong = submitted && isSelected && opt !== correctAns;

                                    let style = "border-slate-100 bg-slate-50 text-slate-600";
                                    if (isSelected) style = "border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold";
                                    if (submitted) {
                                        if (isCorrect) style = "border-green-200 bg-green-50 text-green-700 font-bold";
                                        else if (isWrong) style = "border-red-200 bg-red-50 text-red-600 opacity-70";
                                        else style = "border-slate-50 bg-white opacity-40 text-slate-400";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleOptionSelect(m._id, opt)}
                                            disabled={submitted}
                                            className={`text-left px-4 py-3 border-2 rounded-xl transition-all text-sm flex justify-between items-center ${style}`}
                                        >
                                            {opt}
                                            {isCorrect && <span>✓</span>}
                                            {isWrong && <span>✕</span>}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            {submitted && !userAnswers[m._id] === correctAns && (
                                <p className="mt-3 text-xs font-bold text-indigo-500 bg-indigo-50 p-2 rounded-lg">
                                    Ans: {correctAns}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Action Buttons */}
            {!submitted ? (
                <button 
                    onClick={calculateScore}
                    className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                >
                    Show My Score
                </button>
            ) : (
                <div className="mt-10 space-y-3">
                    <p className="text-center font-bold text-slate-400 text-sm uppercase tracking-widest">Share with friends</p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => window.open(`https://api.whatsapp.com/send?text=I scored ${score}/${quiz.mcqs.length}! Challenge me: ${window.location.href}`, '_blank')}
                            className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold text-center shadow-md text-sm"
                        >
                            WhatsApp
                        </button>
                        <button 
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                            className="flex-1 bg-[#1877F2] text-white py-3 rounded-xl font-bold text-center shadow-md text-sm"
                        >
                            Facebook
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}