import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LayoutGrid, BookOpen, Briefcase, PlusCircle, CheckCircle2, FileText, Users, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ mcqs: 0, jobs: 0 });
  const [categories, setCategories] = useState([]); // Database categories list
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  // States for Job Form
  const [jobData, setJobData] = useState({
    jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: ''
  });
  const [jobFile, setJobFile] = useState(null);

  // States for MCQ Form
  const [mcqData, setMcqData] = useState({
    subject: '', 
    difficulty: 'Medium', 
    question: '',
    options: ['', '', '', ''], 
    correctAnswer: ''
  });

  const token = localStorage.getItem('token');

  // Database se data fetch karna
  const fetchData = async () => {
    try {
      setLoadingStats(true);
      const [mcqRes, jobRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/mcqs/all"),
        axios.get("http://localhost:5000/api/jobs/all"),
        axios.get("http://localhost:5000/api/categories/all") // Category manager endpoint
      ]);

      setCounts({
        mcqs: mcqRes.data.data?.length || 0,
        jobs: jobRes.data.data?.length || 0
      });

      // Database se aayi hui categories set karna
      if (catRes.data) {
        setCategories(catRes.data);
      }

      setLoadingStats(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') {
        Swal.fire({ icon: 'error', title: 'Unauthorized!', text: 'Sirf Admin hi yahan aa sakta hai.' });
        navigate("/");
    } else {
        fetchData();
    }
  }, [navigate]);

  const stats = [
    { title: "Total MCQs", count: counts.mcqs.toLocaleString(), trend: "Live", icon: <BookOpen size={18} className="text-blue-400" />, sub: "Questions in database" },
    { title: "Job Posts", count: counts.jobs.toLocaleString(), trend: "Active", icon: <Briefcase size={18} className="text-emerald-400" />, sub: "Active vacancies" },
    { title: "Total Categories", count: categories.length, trend: "Dynamic", icon: <LayoutGrid size={18} className="text-cyan-400" />, sub: "From Database" },
    { title: "Total Users", count: "1,204", trend: "+12%", icon: <Users size={18} className="text-purple-400" />, sub: "Registered students" },
  ];

  // --- JOB SUBMIT ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(jobData).forEach(key => formData.append(key, jobData[key]));
    if (jobFile) formData.append("jobImage", jobFile);

    try {
      Swal.fire({ title: 'Posting...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const res = await axios.post("http://localhost:5000/api/jobs/post", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        Swal.fire({ title: 'Success!', text: 'Job posted successfully.', icon: 'success' });
        setJobData({ jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: '' });
        setJobFile(null);
        fetchData();
      }
    } catch (err) { Swal.fire('Error', 'Failed to post job', 'error'); }
  };

  // --- MCQ SUBMIT ---
  const handleMcqSubmit = async (e) => {
    e.preventDefault();
    if (!mcqData.subject) return Swal.fire({ title: 'Rukain!', text: 'Category select karein.', icon: 'warning' });
    if (!mcqData.correctAnswer) return Swal.fire({ title: 'Wait!', text: 'Sahi jawab select karein.', icon: 'warning' });

    try {
        Swal.fire({ title: 'Saving...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const payload = {
            question: mcqData.question,
            options: mcqData.options,
            correctAnswer: mcqData.correctAnswer,
            category: mcqData.subject,
            difficulty: mcqData.difficulty
        };

        const res = await axios.post("http://localhost:5000/api/mcqs/add", payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
            Swal.fire({ title: 'Saved!', text: 'MCQ database mein add ho gaya.', icon: 'success', timer: 1500 });
            setMcqData({ ...mcqData, question: '', options: ['', '', '', ''], correctAnswer: '' });
            fetchData();
        }
    } catch (err) { Swal.fire({ title: 'Error!', text: 'Failed to add MCQ', icon: 'error' }); }
  };

  const updateOption = (index, value) => {
    const newOptions = [...mcqData.options];
    newOptions[index] = value;
    setMcqData({ ...mcqData, options: newOptions });
  };

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      Swal.fire({ title: 'Uploading...', didOpen: () => Swal.showLoading() });
      await axios.post("http://localhost:5000/api/mcqs/upload-csv", formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      Swal.fire('Success!', 'Bulk MCQs added!', 'success');
      fetchData();
    } catch (err) { Swal.fire('Error', 'CSV upload failed', 'error'); }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 w-full font-sans">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Nabil. Sab kuch dynamic hai!</p>
        </div>
        <button onClick={() => navigate('/admin/categories')} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
          <LayoutGrid size={16} className="text-blue-500" /> Manage Categories
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase">{stat.trend}</span>
            </div>
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{loadingStats ? "..." : stat.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* JOB FORM */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Briefcase className="text-blue-500" /> Post New Job</h2>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={jobData.jobTitle} placeholder="Job Title" onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })} required />
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
            <textarea className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm h-24 outline-none"
              value={jobData.description} placeholder="Requirements..." onChange={(e) => setJobData({ ...jobData, description: e.target.value })} required />
            
            <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center bg-gray-50">
                <input type="file" id="jobImage" className="hidden" onChange={(e) => setJobFile(e.target.files[0])} />
                <label htmlFor="jobImage" className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon className={jobFile ? "text-green-500" : "text-gray-400"} size={24} />
                    <span className="text-xs">{jobFile ? jobFile.name : "Upload Advertisement"}</span>
                </label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg transition-all active:scale-95">Publish Update</button>
          </form>
        </div>

        {/* DATABASE HEALTH / ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl overflow-y-auto max-h-[500px]">
          <h2 className="text-xl font-bold mb-6">Database Health</h2>
          <div className="space-y-6 relative border-l-2 border-gray-100 ml-2">
            {[
              { t: "MCQ Categories", d: `${categories.length} subjects found in database.`, c: "bg-blue-500" },
              { t: "Active Vacancies", d: `${counts.jobs} live jobs posted.`, c: "bg-emerald-500" },
              { t: "System Status", d: "All APIs responding normally.", c: "bg-purple-500" }
            ].map((act, i) => (
              <div key={i} className="relative pl-6">
                <div className={`absolute left-[-6px] top-1.5 w-3 h-3 ${act.c} rounded-full border-2 border-white`} />
                <p className="text-sm font-semibold">{act.t}</p>
                <p className="text-xs text-gray-500">{act.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SINGLE MCQ FORM WITH DATABASE CATEGORIES */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><PlusCircle className="text-green-500" /> Add Single MCQ</h2>
        <form onSubmit={handleMcqSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
{/* MCQ Form Dropdown */}
<select 
  className="bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
  value={mcqData.subject} 
  onChange={(e) => setMcqData({ ...mcqData, subject: e.target.value })} 
  required
>
  <option value="">Select Sub-Category</option>
  {categories
    .filter(c => !c.parent) // Main Categories
    .map(main => (
      <optgroup key={main._id} label={main.name}>
        {categories
          .filter(sub => sub.parent === main._id) // Sub categories
          .map(sub => (
            <option key={sub._id} value={sub.name}>{sub.name}</option>
          ))
        }
      </optgroup>
    ))
  }
</select>

            <select className="bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none font-bold text-gray-700"
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
                <input className="flex-1 bg-transparent p-1 outline-none text-sm font-semibold"
                  value={opt} placeholder="Type option..." onChange={(e) => updateOption(index, e.target.value)} required />
                <CheckCircle2 onClick={() => setMcqData({ ...mcqData, correctAnswer: opt })}
                  className={`cursor-pointer transition-colors ${mcqData.correctAnswer === opt && opt !== '' ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`} size={22} />
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 uppercase tracking-widest">
            Save Question to Database
          </button>
        </form>
      </div>

      {/* BULK UPLOAD SECTION */}
      <div className="mt-8 p-10 bg-blue-600 rounded-3xl text-center shadow-xl text-white">
        <FileText size={48} className="mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-bold">Bulk Upload Questions</h3>
        <p className="text-blue-100 mb-6 text-sm">Upload a CSV file to add multiple MCQs at once.</p>
        <label className="bg-white text-blue-600 px-8 py-3 rounded-xl cursor-pointer font-black transition-all hover:bg-blue-50">
          SELECT CSV FILE
          <input type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
        </label>
      </div>
    </div>
  );
};

export default AdminDashboard;