import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, BookOpen, Loader2 } from 'lucide-react';

const SubjectDetails = () => {
    const { subjectSlug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/categories/${subjectSlug}`);
                setData(res.data);
            } catch (err) { console.error("Error fetching data"); }
            finally { setLoading(false); }
        };
        fetchDetails();
    }, [subjectSlug]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Dynamic Banner based on Subject Color */}
            <div className={`bg-gradient-to-r ${data?.subject?.color || 'from-slate-700 to-slate-900'} h-64 flex items-center justify-center text-center px-4`}>
                <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-xl">
                    {data?.subject?.name}
                </h1>
            </div>

            <div className="max-w-5xl mx-auto -mt-12 px-4 pb-20">
                <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">ID</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {data?.categories.map((cat, index) => (
                                <tr 
                                    key={cat._id} 
                                    onClick={() => navigate(`/category/${cat.slug}`)}
                                    className="hover:bg-emerald-50/50 cursor-pointer transition-all group"
                                >
                                    <td className="px-8 py-5 text-center font-bold text-slate-300 group-hover:text-emerald-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                <BookOpen size={18} />
                                            </div>
                                            <span className="font-bold text-slate-700 group-hover:text-slate-950">{cat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <ChevronRight size={20} className="inline text-slate-200 group-hover:text-emerald-500 transition-colors" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubjectDetails;