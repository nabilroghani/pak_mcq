import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import MCQs_cart_RightSide from '../Components/MCQs_cart_RightSide';
import WhatsappBtn from '../Components/WhatsappBtn';
import api from '../utils/api';

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    const timerRef = useRef(null);

    useEffect(() => {
        const fetchLatestQuiz = async () => {
            try {
                const res = await api.get(`/quizzes/latest`);
                if (res.data.success && res.data.quiz && res.data.quiz.mcqs?.length > 0) {
                    setQuiz(res.data.quiz);
                    setTimeLeft(res.data.quiz.mcqs.length * 30);
                } else {
                    setQuiz(null);
                }
            } catch (err) {
                console.error("Quiz Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestQuiz();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !submitted) {
            timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timerRef.current);
        } else if (timeLeft === 0 && !submitted && quiz) {
            calculateScore();
        }
    }, [timeLeft, submitted, quiz]);

    const handleOptionSelect = (qId, opt) => {
        if (!submitted) {
            setUserAnswers(prev => ({ ...prev, [qId]: opt }));
        }
    };

    const calculateScore = () => {
        if (submitted || !quiz) return;
        let currentScore = 0;
        quiz.mcqs.forEach((m) => {
            const userAnswer = userAnswers[m._id];
            const correctAns = m.answer || m.correctAnswer;
            if (userAnswer === correctAns) currentScore++;
        });

        setScore(currentScore);
        setSubmitted(true);

        if (currentScore / quiz.mcqs.length >= 0.7) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            Swal.fire({ icon: 'success', title: 'Great Job!', text: `Your score is ${currentScore}/${quiz.mcqs.length}` });
        } else {
            Swal.fire({ icon: 'info', title: 'Quiz Completed', text: `Your score is ${currentScore}/${quiz.mcqs.length}` });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!quiz) return (
        <div className="flex h-screen items-center justify-center bg-[#F8FAFC] px-4 text-center">
            <div>
                <div className="text-5xl mb-4">⏳</div>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">No Live Quiz Right Now</h2>
                <p className="text-slate-500 text-sm mt-2">Admin is currently preparing the next assessment.</p>
            </div>
        </div>
    );

    const progress = (Object.keys(userAnswers).length / quiz.mcqs.length) * 100;

    return (
        <div className="min-h-screen bg-white pb-12">
            {<WhatsappBtn/>}
            {/* Header Section */}
            <div className="sticky top-0 md:top-[64px] z-[999] bg-white border-b border-blue-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="truncate pr-4">
                        <h1 className="text-sm md:text-lg font-black text-slate-800 truncate uppercase tracking-tighter">
                            {quiz.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Active Quiz</span>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-black text-sm md:text-lg border-2 transition-colors ${timeLeft < 20 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-blue-600 border-blue-700 text-white'}`}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100">
                    <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT/CENTER: MCQs (Takes 8 columns) */}
                    <div className="lg:col-span-8">
                        {/* Score Summary (Old Styling) */}
                        {submitted && (
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 mb-10 text-center shadow-xl shadow-blue-200 text-white">
                                <span className="text-[11px] font-black uppercase opacity-80 tracking-widest">Performance Summary</span>
                                <h2 className="text-6xl font-black mt-2">
                                    {score}<span className="opacity-40">/</span>{quiz.mcqs.length}
                                </h2>
                                <div className="mt-4 flex flex-wrap justify-center gap-4">
                                    <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">
                                        Accuracy: {Math.round((score/quiz.mcqs.length)*100)}%
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MCQs List (Aapki original styling) */}
                        <div className="space-y-6">
                            {quiz.mcqs.map((m, index) => (
                                <div key={m._id || index} className={`bg-white rounded-2xl p-5 md:p-8 border-2 transition-all shadow-sm ${submitted ? 'border-transparent' : 'border-gray-50 hover:border-blue-100'}`}>
                                    <div className="flex items-start gap-4 mb-6">
                                        <span className="flex-shrink-0 w-10 h-10 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center text-sm font-black">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-base md:text-xl font-bold text-slate-800 leading-snug pt-2">
                                            {m.question}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {m.options.map((opt, i) => {
                                            const label = String.fromCharCode(65 + i);
                                            const isSelected = userAnswers[m._id] === opt;
                                            const correctValue = m.answer || m.correctAnswer;
                                            const isCorrect = submitted && (opt === correctValue);
                                            const isWrong = submitted && isSelected && (opt !== correctValue);

                                            let btnStyle = "flex items-start p-4 border-2 rounded-2xl text-sm md:text-base font-bold transition-all text-left ";
                                            
                                            if (submitted) {
                                                if (isCorrect) btnStyle += "bg-emerald-500 border-emerald-500 text-white";
                                                else if (isWrong) btnStyle += "bg-red-500 border-red-500 text-white";
                                                else btnStyle += "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                                            } else {
                                                if (isSelected) btnStyle += "bg-blue-50 border-blue-600 text-blue-700 shadow-md shadow-blue-50";
                                                else btnStyle += "bg-white border-gray-100 text-slate-600 hover:border-blue-200 hover:bg-slate-50";
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    disabled={submitted}
                                                    onClick={() => handleOptionSelect(m._id, opt)}
                                                    className={btnStyle}
                                                >
                                                    <span className={`w-8 shrink-0 font-black ${submitted ? 'text-white' : 'text-blue-500'}`}>{label}.</span>
                                                    <span className="flex-1">{opt}</span>
                                                    {submitted && isCorrect && <span className="ml-2 font-bold">✓</span>}
                                                    {submitted && isWrong && <span className="ml-2 font-bold">✕</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!submitted && (
                            <button 
                                onClick={calculateScore}
                                className="w-full mt-12 bg-[#1565C0] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 hover:bg-black transition-all active:scale-[0.98] uppercase tracking-widest"
                            >
                                Finish & Submit
                            </button>
                        )}
                    </div>

                    {/* RIGHT SIDE: Categories (Takes 4 columns) */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-[150px]">
                            <MCQs_cart_RightSide />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}