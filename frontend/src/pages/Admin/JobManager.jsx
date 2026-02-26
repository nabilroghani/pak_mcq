import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, Plus, Calendar, MapPin, Trash2, Edit3, Briefcase, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobManager = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/jobs/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data && Array.isArray(res.data.data)) {
                setJobs(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
            setJobs([]);
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This job post will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/jobs/delete/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setJobs(jobs.filter(job => job._id !== id));
                    Swal.fire('Deleted!', 'Job has been removed.', 'success');
                } catch (err) {
                    Swal.fire('Error', 'Failed to delete', 'error');
                }
            }
        });
    };

    const handleEdit = (job) => {
        Swal.fire({
            title: '<span style="color: #059669">Edit Job Details</span>',
            width: '600px',
            html: `
            <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; font-family: sans-serif;">
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #374151;">Job Title</label>
                    <input id="edit-title" class="swal2-input" style="width: 100%; margin: 5px 0;" value="${job.jobTitle}">
                </div>
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #374151;">Organization</label>
                    <input id="edit-org" class="swal2-input" style="width: 100%; margin: 5px 0;" value="${job.organization}">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-size: 13px; font-weight: 600; color: #374151;">Department</label>
                        <input id="edit-dept" class="swal2-input" style="width: 100%; margin: 5px 0;" value="${job.department}">
                    </div>
                    <div>
                        <label style="font-size: 13px; font-weight: 600; color: #374151;">Location</label>
                        <input id="edit-loc" class="swal2-input" style="width: 100%; margin: 5px 0;" value="${job.location}">
                    </div>
                </div>
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #374151;">Deadline</label>
                    <input type="date" id="edit-deadline" class="swal2-input" style="width: 100%; margin: 5px 0;" value="${job.deadline ? job.deadline.split('T')[0] : ''}">
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update Now',
            confirmButtonColor: '#10b981',
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
                    await axios.put(`http://localhost:5000/api/jobs/update/${job._id}`, result.value, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire('Updated!', 'Job details saved.', 'success');
                    fetchJobs();
                } catch (err) {
                    Swal.fire('Error', 'Update failed', 'error');
                }
            }
        });
    };

    const filteredJobs = Array.isArray(jobs)
        ? jobs.filter(j =>
            j.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            j.organization?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-gray-800 w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Listings Manager</h1>
                    <p className="text-gray-500 font-medium">Manage and update career opportunities on the portal</p>
                </div>
                <button 
                    onClick={()=> navigate("/admin/dashboard")} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-emerald-200"
                >
                    <Plus size={20} /> Post New Job
                </button>
            </div>

            {/* Search Bar Container */}
            <div className="bg-white p-5 rounded-t-2xl border border-gray-200 shadow-sm">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Search by title or company..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white border-x border-b border-gray-200 rounded-b-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-[12px] uppercase tracking-wider border-y border-gray-200">
                            <th className="px-6 py-4 font-bold">Position & Location</th>
                            <th className="px-6 py-4 font-bold">Organization</th>
                            <th className="px-6 py-4 font-bold">Last Date</th>
                            <th className="px-6 py-4 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-20 text-gray-400 animate-pulse">Fetching records...</td></tr>
                        ) : (
                            filteredJobs.map((job) => (
                                <tr key={job._id} className="hover:bg-emerald-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                {job.jobTitle || "Untitled Position"}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                                                <MapPin size={12} className="text-emerald-500" /> {job.location || "Remote/Pakistan"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gray-100 rounded text-gray-600">
                                                <Building2 size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{job.organization}</p>
                                                <p className="text-[11px] text-gray-400">{job.department}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                                            <Calendar size={13} />
                                            {job.deadline ? new Date(job.deadline).toLocaleDateString('en-GB') : "N/A"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(job)}
                                                className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                title="Edit Job"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                
                {!loading && filteredJobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Briefcase size={48} className="mb-3 opacity-20" />
                        <p className="font-medium">No matching jobs found in records.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobManager;