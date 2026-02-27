import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, Plus, Calendar, MapPin, Trash2, Edit3, Briefcase, Building2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobManager = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Base URL for Local Development
    const API_BASE_URL = "http://localhost:5000/api/jobs";

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data && Array.isArray(res.data.data)) {
                setJobs(res.data.data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Job Post?',
            text: "Yeh job portal se permanently remove ho jayegi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Delete',
            borderRadius: '15px'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setJobs(jobs.filter(job => job._id !== id));
                    Swal.fire({ title: 'Removed!', icon: 'success', timer: 1500, showConfirmButton: false });
                } catch (err) {
                    Swal.fire('Error', 'Unauthorized or Network Issue', 'error');
                }
            }
        });
    };

    const handleEdit = (job) => {
        Swal.fire({
            title: '<h2 style="color: #059669; font-weight: 800;">Update Job Listing</h2>',
            width: '650px',
            background: '#ffffff',
            html: `
            <div style="text-align: left; display: flex; flex-direction: column; gap: 15px; padding: 10px; font-family: sans-serif;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Job Title</label>
                        <input id="edit-title" class="swal2-input" style="width: 100%; margin: 5px 0; border-radius: 10px;" value="${job.jobTitle}">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Organization</label>
                        <input id="edit-org" class="swal2-input" style="width: 100%; margin: 5px 0; border-radius: 10px;" value="${job.organization}">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Department</label>
                        <input id="edit-dept" class="swal2-input" style="width: 100%; margin: 5px 0; border-radius: 10px;" value="${job.department}">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Location</label>
                        <input id="edit-loc" class="swal2-input" style="width: 100%; margin: 5px 0; border-radius: 10px;" value="${job.location}">
                    </div>
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Application Deadline</label>
                    <input type="date" id="edit-deadline" class="swal2-input" style="width: 100%; margin: 5px 0; border-radius: 10px;" value="${job.deadline ? job.deadline.split('T')[0] : ''}">
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            confirmButtonColor: '#059669',
            cancelButtonColor: '#94a3b8',
            preConfirm: () => {
                return {
                    jobTitle: document.getElementById('edit-title').value,
                    organization: document.getElementById('edit-org').value,
                    department: document.getElementById('edit-dept').value,
                    location: document.getElementById('edit-loc').value,
                    deadline: document.getElementById('edit-deadline').value,
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${API_BASE_URL}/update/${job._id}`, result.value, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire({ icon: 'success', title: 'Updated Successfully!', timer: 1500, showConfirmButton: false });
                    fetchJobs();
                } catch (err) {
                    Swal.fire('Error', 'Failed to update record', 'error');
                }
            }
        });
    };

    const filteredJobs = jobs.filter(j =>
        j.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-10 bg-[#f9fafb] min-h-screen text-slate-800 w-full font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            Job <span className="text-emerald-600">Portal</span> Admin
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Manage current vacancies and recruitment drives</p>
                    </div>
                    <button 
                        onClick={()=> navigate("/admin/dashboard")} 
                        className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 hover:-translate-y-1 text-white px-7 py-3.5 rounded-2xl flex items-center gap-2 font-black transition-all shadow-xl shadow-emerald-100 active:scale-95"
                    >
                        <Plus size={22} strokeWidth={3} /> POST NEW JOB
                    </button>
                </div>

                {/* Stats Summary (Mini) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Jobs</p>
                        <p className="text-2xl font-black text-slate-800">{jobs.length}</p>
                    </div>
                </div>

                {/* Search Bar Container */}
                <div className="bg-white p-6 rounded-t-3xl border-t border-x border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                            placeholder="Search by job title, company, or city..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <ExternalLink size={14}/> Live on Website
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border-x border-b border-slate-200 rounded-b-3xl overflow-hidden shadow-2xl shadow-slate-200/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-500 text-[10px] uppercase tracking-[0.15em] font-black border-y border-slate-200">
                                    <th className="px-8 py-5">Position Details</th>
                                    <th className="px-8 py-5">Organization</th>
                                    <th className="px-8 py-5">Deadline</th>
                                    <th className="px-8 py-5 text-center">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-32">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Jobs...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredJobs.map((job) => (
                                        <tr key={job._id} className="hover:bg-emerald-50/30 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors tracking-tight">
                                                        {job.jobTitle || "Untitled Position"}
                                                    </span>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                                                        <MapPin size={13} className="text-emerald-500" /> {job.location || "Multiple Locations"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                                        <Building2 size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-700">{job.organization}</p>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{job.department}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold">
                                                    <Calendar size={14} className="text-emerald-500" />
                                                    {job.deadline ? new Date(job.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Open Always"}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(job)}
                                                        className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                    >
                                                        <Edit3 size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(job._id)}
                                                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        
                        {!loading && filteredJobs.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-32 text-slate-300">
                                <Briefcase size={60} className="mb-4 opacity-10" />
                                <h3 className="text-slate-800 font-black text-xl">No Jobs Found</h3>
                                <p className="text-sm font-medium">Try refining your search or post a new vacancy.</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Footer Info */}
                <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    &copy; 2026 Career Management System | Secure Admin Access
                </p>
            </div>
        </div>
    );
};

export default JobManager;