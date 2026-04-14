import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchLatestQuiz = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/quizzes/latest`);
                
                // Check if success is true AND quiz exists AND mcqs array khali nahi hai
                if (res.data.success && res.data.quiz && res.data.quiz.mcqs?.length > 0) {
                    setQuiz(res.data.quiz);
                    setTimeLeft(res.data.quiz.mcqs.length * 30);
                } else {
                    // Agar Admin ne reset kiya hai toh quiz state null hi rahegi
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
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !submitted && quiz) {
            calculateScore();
        }
    }, [timeLeft, submitted, quiz]);

    const handleOptionSelect = (qId, opt) => {
        if (!submitted) setUserAnswers(prev => ({ ...prev, [qId]: opt }));
    };

    const calculateScore = () => {
        if (submitted || !quiz) return;
        let currentScore = 0;
        quiz.mcqs.forEach(m => {
            const correctAns = m.answer || m.correctAnswer;
            if (userAnswers[m._id] === correctAns) currentScore++;
        });

        setScore(currentScore);
        setSubmitted(true);
        
        if (currentScore / quiz.mcqs.length >= 0.7) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600"></div>
        </div>
    );

    // Agar Builder reset hai ya koi quiz nahi mili
    if (!quiz) return (
        <div className="flex h-screen items-center justify-center bg-slate-50 px-4 text-center">
            <div>
                <div className="text-5xl mb-4">⏳</div>
                <h2 className="text-xl font-black text-slate-800">No Live Quiz Right Now</h2>
                <p className="text-slate-500 text-sm mt-2">Admin is currently preparing the next assessment.</p>
            </div>
        </div>
    );

    const progress = (Object.keys(userAnswers).length / quiz.mcqs.length) * 100;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-12">
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="truncate pr-4">
                        <h1 className="text-lg font-black text-slate-900 truncate">{quiz.title}</h1>
                        <p className="text-[10px] text-indigo-500 font-bold uppercase mt-1">Live Assessment</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-mono font-black text-sm ${timeLeft < 20 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100">
                    <div className="h-full bg-indigo-600 transition-all duration-700" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 mt-8">
                {submitted && (
                    <div className="bg-white border-2 border-indigo-500 rounded-[2rem] p-8 mb-10 text-center shadow-xl shadow-indigo-100">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Your Score</span>
                        <h2 className="text-6xl font-black text-slate-900 mt-2">{score}<span className="text-slate-300">/</span>{quiz.mcqs.length}</h2>
                        <p className="text-slate-500 font-bold text-sm mt-1">Accuracy: {Math.round((score/quiz.mcqs.length)*100)}%</p>
                    </div>
                )}

                <div className="space-y-6">
                    {quiz.mcqs.map((m, index) => (
                        <div key={m._id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm transition-all">
                            <div className="flex items-start gap-4 mb-6">
                                <span className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-base font-black">
                                    {index + 1}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 leading-snug pt-1">
                                    {m.question}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {m.options.map((opt, i) => {
                                    const isSelected = userAnswers[m._id] === opt;
                                    const correctValue = m.answer || m.correctAnswer;
                                    const isCorrect = submitted && (opt === correctValue);
                                    const isWrong = submitted && isSelected && (opt !== correctValue);

                                    let style = "p-5 border-2 rounded-2xl text-sm font-bold transition-all text-left flex justify-between items-center ";
                                    
                                    if (isSelected) style += "border-indigo-600 bg-indigo-50 text-indigo-700 ";
                                    else style += "border-slate-100 bg-slate-50 text-slate-600 ";

                                    if (submitted) {
                                        if (isCorrect) style = "p-5 border-2 rounded-2xl text-sm font-bold flex justify-between items-center border-green-500 bg-green-50 text-green-700";
                                        else if (isWrong) style = "p-5 border-2 rounded-2xl text-sm font-bold flex justify-between items-center border-red-500 bg-red-50 text-red-700";
                                        else style += "opacity-40 grayscale-[0.5]";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={submitted}
                                            onClick={() => handleOptionSelect(m._id, opt)}
                                            className={style}
                                        >
                                            <span>{opt}</span>
                                            {submitted && isCorrect && <span>✅</span>}
                                            {submitted && isWrong && <span>❌</span>}
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
                        className="w-full mt-10 bg-indigo-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-indigo-200 hover:bg-black transition-all active:scale-[0.98]"
                    >
                        SUBMIT ASSESSMENT
                    </button>
                )}
            </div>
        </div>
    );
}