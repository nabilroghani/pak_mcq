import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LayoutGrid, BookOpen, Briefcase, PlusCircle, CheckCircle2, Calendar, MapPin, Building2, FileText, Users, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ mcqs: 0, jobs: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  // States for Forms
  const [jobData, setJobData] = useState({
    jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: ''
  });
  const [jobFile, setJobFile] = useState(null); // For Job Image

  const [mcqData, setMcqData] = useState({
    subject: '', difficulty: 'Medium', question: '',
    options: ['', '', '', ''], correctAnswer: ''
  });

  const token = localStorage.getItem('token');

  const fetchStats = async () => {
    try {
      const [mcqRes, jobRes] = await Promise.all([
        axios.get("http://localhost:5000/api/mcqs/all"),
        axios.get("http://localhost:5000/api/jobs/all")
      ]);
      setCounts({
        mcqs: mcqRes.data.data?.length || 0,
        jobs: jobRes.data.data?.length || 0
      });
      setLoadingStats(false);
    } catch (err) {
      console.error("Stats Error:", err);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') {
        Swal.fire({ icon: 'error', title: 'Unauthorized!', text: 'Sirf Admin hi yahan aa sakta hai.' });
        navigate("/");
    } else {
        fetchStats();
    }
  }, [navigate]);

  const stats = [
    { title: "Total MCQs", count: counts.mcqs.toLocaleString(), trend: "Live", icon: <BookOpen size={18} className="text-blue-400" />, sub: "Questions in database" },
    { title: "Job Posts", count: counts.jobs.toLocaleString(), trend: "Active", icon: <Briefcase size={18} className="text-emerald-400" />, sub: "Active vacancies" },
    { title: "Total Quizzes", count: "456", trend: "+5", icon: <LayoutGrid size={18} className="text-cyan-400" />, sub: "Active now" },
    { title: "Total Users", count: "1,204", trend: "+12%", icon: <Users size={18} className="text-purple-400" />, sub: "Registered students" },
  ];

  // --- JOB SUBMIT WITH IMAGE ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData for Image Upload
    const formData = new FormData();
    formData.append("jobTitle", jobData.jobTitle);
    formData.append("organization", jobData.organization);
    formData.append("department", jobData.department);
    formData.append("location", jobData.location);
    formData.append("deadline", jobData.deadline);
    formData.append("description", jobData.description);
    if (jobFile) {
        formData.append("jobImage", jobFile); // Key should match backend upload.single('jobImage')
    }

    try {
      Swal.fire({ title: 'Posting...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
      const res = await axios.post("http://localhost:5000/api/jobs/post", formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" 
        }
      });

      if (res.data.success) {
        Swal.fire({ title: 'Success!', text: 'Job has been posted with advertisement.', icon: 'success' });
        setJobData({ jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: '' });
        setJobFile(null);
        fetchStats();
      }
    } catch (err) {
      Swal.fire({ title: 'Error!', text: err.response?.data?.message || 'Failed to post job', icon: 'error' });
    }
  };

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      Swal.fire({ title: 'Uploading...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      await axios.post("http://localhost:5000/api/mcqs/upload-csv", formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      Swal.fire({ title: 'Success!', text: 'Bulk MCQs added!', icon: 'success' });
      fetchStats();
    } catch (err) {
      Swal.fire('Error', 'CSV upload failed. Check format.', 'error');
    }
  };

  const handleMcqSubmit = async (e) => {
    e.preventDefault();
    if (!mcqData.correctAnswer) return Swal.fire({ title: 'Wait!', text: 'Please select a correct answer.', icon: 'warning' });

    try {
      const res = await axios.post("http://localhost:5000/api/mcqs/add", {
        question: mcqData.question,
        options: mcqData.options,
        correctAnswer: mcqData.correctAnswer,
        category: mcqData.subject,
        difficulty: mcqData.difficulty
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        Swal.fire({ title: 'Saved!', text: 'MCQ added successfully.', icon: 'success' });
        setMcqData({ subject: '', difficulty: 'Medium', question: '', options: ['', '', '', ''], correctAnswer: '' });
        fetchStats();
      }
    } catch (err) {
      Swal.fire({ title: 'Error!', text: 'Failed to add MCQ', icon: 'error' });
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...mcqData.options];
    newOptions[index] = value;
    setMcqData({ ...mcqData, options: newOptions });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 w-full font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Nabil. Ready to update the portal?</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase">{stat.trend}</span>
            </div>
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1 tracking-tight">
              {loadingStats ? "..." : stat.count}
            </p>
            <p className="text-[10px] text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* POST JOB FORM (With Image Upload) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Briefcase className="text-blue-500" /> Post New Job</h2>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.jobTitle} placeholder="Job Title (e.g. Senior Software Engineer)" onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })} required />

            <div className="grid grid-cols-2 gap-4">
              <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none"
                value={jobData.organization} onChange={(e) => setJobData({ ...jobData, organization: e.target.value })}>
                <option>Khyber Heights</option>
                <option>PSC Pakistan</option>
                <option>NTS</option>
                <option>Others</option>
              </select>
              <input className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none"
                value={jobData.department} placeholder="Department" onChange={(e) => setJobData({ ...jobData, department: e.target.value })} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none"
                value={jobData.location} placeholder="Location (e.g. Peshawar)" onChange={(e) => setJobData({ ...jobData, location: e.target.value })} required />
              <input type="date" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none text-gray-500"
                value={jobData.deadline} onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })} required />
            </div>

            <textarea className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm h-24 outline-none"
              value={jobData.description} placeholder="Short Description or Requirements..." onChange={(e) => setJobData({ ...jobData, description: e.target.value })} required />

            {/* IMAGE UPLOAD FIELD */}
            <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center bg-gray-50">
                <input type="file" accept="image/*" id="jobImage" className="hidden" onChange={(e) => setJobFile(e.target.files[0])} />
                <label htmlFor="jobImage" className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon className={jobFile ? "text-green-500" : "text-gray-400"} size={24} />
                    <span className="text-xs font-medium text-gray-600">
                        {jobFile ? `Selected: ${jobFile.name}` : "Upload Job Advertisement Image"}
                    </span>
                </label>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20">Publish Job Update</button>
          </form>
        </div>

        {/* RECENT ACTIVITY LIST */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl overflow-y-auto max-h-[550px]">
          <h2 className="text-xl font-bold mb-6 flex items-center justify-between">Recent Activity</h2>
          <div className="space-y-6 relative border-l-2 border-gray-100 ml-2">
            {[
              { t: "Database Sync", d: "Latest MCQ batch synchronized.", time: "Live", c: "bg-blue-500" },
              { t: "Job Board", d: `${counts.jobs} Active vacancies currently listed.`, time: "Now", c: "bg-emerald-500" },
              { t: "Maintenance", d: "Weekly system checkup completed.", time: "1h ago", c: "bg-purple-500" }
            ].map((act, i) => (
              <div key={i} className="relative pl-6">
                <div className={`absolute left-[-6px] top-1.5 w-3 h-3 ${act.c} rounded-full border-2 border-white`} />
                <p className="text-sm font-semibold">{act.t}</p>
                <p className="text-xs text-gray-500 mt-1">{act.d}</p>
                <span className="text-[9px] text-gray-400 uppercase font-bold">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BULK MCQ SECTION */}
      <div className="mb-8 p-10 bg-white border-2 border-dashed border-blue-100 rounded-3xl text-center shadow-sm">
        <FileText size={48} className="mx-auto text-blue-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-800">Bulk Upload Questions</h3>
        <p className="text-sm text-gray-500 mb-6">Import hundreds of MCQs instantly via CSV file.</p>
        <label className="bg-gray-900 text-white hover:bg-black px-8 py-3 rounded-xl cursor-pointer font-bold transition-all">
          Select CSV File
          <input type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
        </label>
      </div>

      {/* SINGLE MCQ FORM */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><PlusCircle className="text-green-500" /> Add Single MCQ</h2>
        <form onSubmit={handleMcqSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={mcqData.subject} placeholder="Category (e.g. Pakistan Studies)" onChange={(e) => setMcqData({ ...mcqData, subject: e.target.value })} required />
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none"
              value={mcqData.difficulty} onChange={(e) => setMcqData({ ...mcqData, difficulty: e.target.value })}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <textarea className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            value={mcqData.question} rows="2" placeholder="Enter Question text here..." onChange={(e) => setMcqData({ ...mcqData, question: e.target.value })} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mcqData.options.map((opt, index) => (
              <div key={index} className={`flex items-center gap-2 bg-gray-50 border p-2 rounded-xl transition-all ${mcqData.correctAnswer === opt && opt !== '' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <span className="text-gray-400 font-bold ml-2">{String.fromCharCode(65 + index)}.</span>
                <input className="flex-1 bg-transparent p-1 outline-none text-sm"
                  value={opt} placeholder="Type option..." onChange={(e) => updateOption(index, e.target.value)} required />
                <CheckCircle2 onClick={() => setMcqData({ ...mcqData, correctAnswer: opt })}
                  className={`cursor-pointer transition-colors ${mcqData.correctAnswer === opt && opt !== '' ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`} size={22} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-blue-700 font-medium italic">Double check the correct answer before saving.</p>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">Save Question</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;