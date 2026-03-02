import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 import kiya

export default function CreateQuiz() {
    const [mcqs, setMcqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMcqs, setSelectedMcqs] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState("");
    const [copyStatus, setCopyStatus] = useState("Copy Link");

    useEffect(() => {
        axios.get('http://localhost:5000/api/mcqs/all')
             .then(res => setMcqs(res.data.data))
             .catch(err => {
                Swal.fire('Error!', 'Failed to fetch MCQs', 'error');
             });
    }, []);

    const handleSelect = (id) => {
        setSelectedMcqs(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredMcqs = mcqs.filter(m => 
        m.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!title || selectedMcqs.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Adhoora Kaam!',
                text: 'Please title likhein aur sawal select karein.',
                confirmButtonColor: '#4F46E5'
            });
        }

        setLoading(true); // Loader shuru
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/quizzes/create', {
                title,
                mcqs: selectedMcqs,
                description: "Daily Quiz Challenge"
            }, { 
                headers: { Authorization: `Bearer ${token}` } 
            });

            if (res.data.success) {
                const fullLink = `${window.location.origin}/quiz-challenge/${res.data.quiz.slug}`;
                setGeneratedLink(fullLink);
                
                // SweetAlert Success
                Swal.fire({
                    icon: 'success',
                    title: 'Zabardast!',
                    text: 'Quiz create ho gayi hai.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire('Opps!', 'Kuch galat ho gaya backend par.', 'error');
        } finally {
            setLoading(false); // Loader khatam
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopyStatus("Copied! ✅");
        setTimeout(() => setCopyStatus("Copy Link"), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans text-slate-800">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 p-8 border-b border-slate-200 text-center">
                    <h1 className="text-3xl font-black text-indigo-900">QUIZ BUILDER</h1>
                    <p className="text-slate-500 font-medium">Sawal dhoondein aur viral challenge banayein.</p>
                </div>

                <div className="p-8">
                    {/* Title Input */}
                    <div className="mb-8">
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-tighter">Quiz Ka Naam</label>
                        <input 
                            className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all text-lg font-bold shadow-sm" 
                            placeholder="e.g. History Mega Quiz"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input 
                            type="text"
                            className="w-full bg-slate-100 border-none p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-300 transition-all text-sm"
                            placeholder="🔍 Sawal search karein..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* MCQs List */}
                    <div className="h-72 overflow-y-auto border border-slate-100 rounded-2xl bg-white p-2 mb-8 custom-scrollbar">
                        {filteredMcqs.map(m => (
                            <div 
                                key={m._id} 
                                onClick={() => handleSelect(m._id)}
                                className={`flex items-center gap-4 p-4 mb-2 rounded-xl cursor-pointer transition-all ${selectedMcqs.includes(m._id) ? 'bg-indigo-600 text-white' : 'hover:bg-slate-50'}`}
                            >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedMcqs.includes(m._id) ? 'border-white' : 'border-slate-300'}`}>
                                    {selectedMcqs.includes(m._id) && <span className="text-[10px]">✔</span>}
                                </div>
                                <p className="text-sm font-semibold">{m.question}</p>
                            </div>
                        ))}
                    </div>

                    {/* Action Button with Loader */}
                    {!generatedLink ? (
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}
                        >
                            {loading && (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "SAVING QUIZ..." : "SAVE & CREATE LINK"}
                        </button>
                    ) : (
                        <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-2xl animate-pulse">
                            <p className="text-indigo-800 font-black mb-3 text-center">MUBARAK HO! LINK TAYYAR HAI 🚀</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input readOnly value={generatedLink} className="flex-1 bg-white border p-4 rounded-xl text-xs font-mono" />
                                <button onClick={copyToClipboard} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black hover:bg-indigo-700">
                                    {copyStatus}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}