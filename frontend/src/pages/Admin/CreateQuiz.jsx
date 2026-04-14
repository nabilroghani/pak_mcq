import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateQuiz() {
    const [mcqs, setMcqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMcqs, setSelectedMcqs] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/mcqs/all')
             .then(res => setMcqs(res.data.data))
             .catch(err => Swal.fire('Error!', 'Failed to fetch MCQs', 'error'));
    }, []);

    const resetForm = () => {
        setTitle("");
        setSelectedMcqs([]);
        setSearchTerm("");
    };

const handleResetBuilder = async () => {
    const result = await Swal.fire({
        title: 'Kya aap sure hain?',
        text: "Isse latest quiz database se delete ho jayegi!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#4F46E5',
        confirmButtonText: 'Haan, Reset kar do!'
    });

    if (result.isConfirmed) {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete('http://localhost:5000/api/quizzes/delete-latest', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                resetForm(); // Alag se states likhne ki zaroorat nahi, ye function call karein
                Swal.fire('Deleted!', 'User panel se quiz hat chuki hai.', 'success');
            }
        } catch (error) {
            console.error("Delete Error:", error);
            Swal.fire('Error!', 'Database se reset nahi ho saka.', 'error');
        }
    }
};

    const handleSelect = (id) => {
        setSelectedMcqs(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const removeMcq = (id) => {
        setSelectedMcqs(prev => prev.filter(i => i !== id));
    };

    const filteredMcqs = mcqs.filter(m => 
        m.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedData = mcqs.filter(m => selectedMcqs.includes(m._id));

    const handleSubmit = async () => {
        if (!title || selectedMcqs.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Adhoora Kaam!',
                text: 'Title likhein aur kam az kam ek sawal select karein.',
                confirmButtonColor: '#4F46E5'
            });
        }

        setLoading(true); 
        try {
            const token = localStorage.getItem('token'); 
            const res = await axios.post('http://localhost:5000/api/quizzes/create', {
                title,
                mcqs: selectedMcqs,
                description: "Challenge Quiz Created by Admin"
            }, { 
                headers: { Authorization: `Bearer ${token}` } 
            });

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Zabardast!',
                    text: 'Quiz save ho chuki hai!',
                    confirmButtonColor: '#4F46E5'
                });
                resetForm(); 
            }
        } catch (error) {
            Swal.fire('Opps!', 'Backend par save nahi ho saka.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-3 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="bg-indigo-900 p-6 md:p-10 text-center text-white relative">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">Quiz Builder Pro</h1>
                    <p className="opacity-70 font-medium text-xs md:text-sm mt-2">Sawal dhoondein aur apni list tayyar karein.</p>
                    
                    <button 
    onClick={handleResetBuilder} // Yahan change kiya
    className="mt-4 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 bg-white/10 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border border-white/20"
>
    Reset Builder
</button>
                </div>

                <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                    
                    {/* LEFT SIDE: SEARCH & SELECT */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. Browse All MCQs</label>
                            <span className="text-indigo-600 font-bold text-xs bg-indigo-50 px-3 py-1 rounded-full">Total: {mcqs.length}</span>
                        </div>
                        
                        <div className="relative">
                            <input 
                                type="text"
                                className="w-full bg-slate-100 border-2 border-transparent focus:border-indigo-500 p-4 rounded-2xl outline-none transition-all text-sm shadow-inner"
                                placeholder="🔍 Search by keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="h-[400px] md:h-[500px] overflow-y-auto border border-slate-100 rounded-2xl bg-slate-50/50 p-2 custom-scrollbar">
                            {filteredMcqs.map(m => (
                                <div 
                                    key={m._id} 
                                    onClick={() => handleSelect(m._id)}
                                    className={`flex items-start gap-4 p-4 mb-2 rounded-xl cursor-pointer transition-all border-2 ${selectedMcqs.includes(m._id) ? 'bg-indigo-50 border-indigo-400 shadow-sm' : 'bg-white border-transparent hover:border-slate-200'}`}
                                >
                                    <div className={`mt-1 min-w-[20px] h-5 w-5 rounded flex items-center justify-center border-2 transition-colors ${selectedMcqs.includes(m._id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                                        {selectedMcqs.includes(m._id) && <span className="text-[10px] font-bold">✓</span>}
                                    </div>
                                    <p className="text-sm font-semibold leading-relaxed text-slate-700">{m.question}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: SELECTED LIST */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. Your Selection ({selectedMcqs.length})</label>
                            {selectedMcqs.length > 0 && (
                                <button onClick={() => setSelectedMcqs([])} className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase flex items-center gap-1 transition-colors">
                                    🗑️ Clear All
                                </button>
                            )}
                        </div>

                        <div className="h-[400px] md:h-[500px] overflow-y-auto border-2 border-dashed border-slate-200 rounded-2xl bg-white p-3 md:p-5 custom-scrollbar">
                            {selectedData.length > 0 ? selectedData.map((m, index) => (
                                <div key={m._id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3 flex justify-between items-start group hover:bg-white hover:border-indigo-200 transition-all shadow-sm">
                                    <div className="pr-4">
                                        <span className="text-[9px] font-black text-indigo-500 uppercase">MCQ #{index + 1}</span>
                                        <p className="text-xs font-bold mt-1 text-slate-700">{m.question}</p>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); removeMcq(m._id); }}
                                        className="flex-shrink-0 bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">No Questions Selected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* FINAL ACTION AREA */}
                <div className="p-6 md:p-10 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-center md:text-left">3. Finalize Quiz Title</label>
                            <input 
                                className="w-full bg-white border-2 border-slate-200 p-4 md:p-5 rounded-2xl focus:border-indigo-500 outline-none transition-all text-base md:text-xl font-bold shadow-sm placeholder:text-slate-300 text-center md:text-left" 
                                placeholder="e.g. JavaScript Advanced Quiz"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className={`w-full py-4 md:py-6 rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'}`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    SAVING...
                                </span>
                            ) : "FINISH & SAVE QUIZ"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}