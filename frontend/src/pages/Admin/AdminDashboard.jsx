import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  LayoutGrid, BookOpen, Briefcase, PlusCircle, CheckCircle2, 
  FileText, Users, Image as ImageIcon, Edit3, Trash2, XCircle, 
  TrendingUp, Activity, UploadCloud
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ mcqs: 0, jobs: 0 });
  const [categories, setCategories] = useState([]); 
  const [allMcqs, setAllMcqs] = useState([]); 
  const [loadingStats, setLoadingStats] = useState(true);
  const [isEditing, setIsEditing] = useState(null); 

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Forms States
  const [jobData, setJobData] = useState({ jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: '' });
  const [jobFile, setJobFile] = useState(null);
  const [mcqData, setMcqData] = useState({ subject: '', difficulty: 'Medium', question: '', options: ['', '', '', ''], correctAnswer: '' });

  const fetchData = async () => {
    try {
      setLoadingStats(true);
      const [mcqRes, jobRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/mcqs/all"),
        axios.get("http://localhost:5000/api/jobs/all"),
        axios.get("http://localhost:5000/api/categories/all")
      ]);
      setAllMcqs(mcqRes.data.data || []);
      setCounts({ mcqs: mcqRes.data.data?.length || 0, jobs: jobRes.data.data?.length || 0 });
      setCategories(catRes.data || []);
      setLoadingStats(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') {
        Swal.fire({ icon: 'error', title: 'Unauthorized!', text: 'Admin access required.' });
        navigate("/");
    } else { fetchData(); }
  }, [navigate]);

  // --- MCQ ACTIONS (ADD / EDIT / DELETE) ---
  const handleMcqSubmit = async (e) => {
    e.preventDefault();
    if (!mcqData.subject || !mcqData.correctAnswer) return Swal.fire('Rukain!', 'Category aur Answer lazmi hain.', 'warning');

    try {
        Swal.fire({ title: isEditing ? 'Updating...' : 'Saving...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const payload = { question: mcqData.question, options: mcqData.options, correctAnswer: mcqData.correctAnswer, category: mcqData.subject, difficulty: mcqData.difficulty };

        if (isEditing) {
          await axios.put(`http://localhost:5000/api/mcqs/edit/${isEditing}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        } else {
          await axios.post("http://localhost:5000/api/mcqs/add", payload, { headers: { Authorization: `Bearer ${token}` } });
        }

        Swal.fire('Success!', isEditing ? 'MCQ Update ho gaya' : 'MCQ Add ho gaya', 'success');
        setMcqData({ ...mcqData, question: '', options: ['', '', '', ''], correctAnswer: '' });
        setIsEditing(null);
        fetchData();
    } catch (err) { Swal.fire('Error!', 'Operation failed', 'error'); }
  };

  const handleEditTrigger = (mcq) => {
    setIsEditing(mcq._id);
    setMcqData({ subject: mcq.category, difficulty: mcq.difficulty, question: mcq.question, options: [...mcq.options], correctAnswer: mcq.correctAnswer });
    window.scrollTo({ top: 800, behavior: 'smooth' }); 
  };

  const handleDeleteMcq = async (id) => {
    const result = await Swal.fire({ title: 'Delete?', text: "Wapis nahi aayega!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Delete' });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/mcqs/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchData();
        Swal.fire('Deleted!', 'MCQ khatam.', 'success');
      } catch (err) { Swal.fire('Error', 'Delete fail', 'error'); }
    }
  };

  // --- BULK UPLOAD ---
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

  // --- JOB ACTIONS ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(jobData).forEach(key => formData.append(key, jobData[key]));
    if (jobFile) formData.append("jobImage", jobFile);

    try {
      Swal.fire({ title: 'Posting...', didOpen: () => Swal.showLoading() });
      await axios.post("http://localhost:5000/api/jobs/post", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      Swal.fire('Success!', 'Job posted.', 'success');
      setJobData({ jobTitle: '', organization: 'Khyber Heights', department: '', location: '', deadline: '', description: '' });
      setJobFile(null);
      fetchData();
    } catch (err) { Swal.fire('Error', 'Job post failed', 'error'); }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 w-full font-sans">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to Admin Panel</p>
        </div>
        <button onClick={() => navigate('/admin/categories')} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <LayoutGrid size={16} className="text-blue-500" /> Categories
        </button>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { t: "Total MCQs", v: counts.mcqs, i: <BookOpen className="text-blue-500"/> },
          { t: "Job Posts", v: counts.jobs, i: <Briefcase className="text-emerald-500"/> },
          { t: "Categories", v: categories.length, i: <LayoutGrid className="text-cyan-500"/> },
          { t: "Users", v: "1,204", i: <Users className="text-purple-500"/> }
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="p-2 bg-gray-50 w-fit rounded-lg mb-4">{s.i}</div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{s.t}</h3>
            <p className="text-2xl font-bold mt-1">{loadingStats ? "..." : s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* JOB FORM */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600"><Briefcase /> Post Job</h2>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm outline-none"
              value={jobData.jobTitle} placeholder="Job Title" onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })} required />
            <div className="grid grid-cols-2 gap-4">
              <input className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm" value={jobData.department} placeholder="Department" onChange={(e) => setJobData({ ...jobData, department: e.target.value })} required />
              <input className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm" type="date" value={jobData.deadline} onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })} required />
            </div>
            <textarea className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm h-24 outline-none" value={jobData.description} placeholder="Requirements..." onChange={(e) => setJobData({ ...jobData, description: e.target.value })} required />
            <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center cursor-pointer hover:bg-gray-50">
                <input type="file" id="jobImg" className="hidden" onChange={(e) => setJobFile(e.target.files[0])} />
                <label htmlFor="jobImg" className="cursor-pointer flex flex-col items-center">
                    <ImageIcon className={jobFile ? "text-green-500" : "text-gray-400"} />
                    <span className="text-[10px] mt-1">{jobFile ? jobFile.name : "Upload Ad"}</span>
                </label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Publish Job</button>
          </form>
        </div>

        {/* RECENT MCQS LIST (EDIT/DELETE TABLE) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl overflow-y-auto max-h-[480px]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-500"><Activity /> Manage Recent MCQs</h2>
          <div className="space-y-3">
            {allMcqs.slice(0, 10).map((m) => (
              <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="truncate pr-4">
                  <p className="text-sm font-semibold truncate w-[200px]">{m.question}</p>
                  <span className="text-[10px] text-blue-500 font-bold uppercase">{m.category}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditTrigger(m)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit3 size={14}/></button>
                  <button onClick={() => handleDeleteMcq(m._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MCQ FORM (ADD & EDIT) */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl relative">
        {isEditing && (
          <button onClick={() => {setIsEditing(null); setMcqData({subject:'', difficulty:'Medium', question:'', options:['','','',''], correctAnswer:''})}} 
            className="absolute top-6 right-6 text-red-500 flex items-center gap-1 text-xs font-bold bg-red-50 px-3 py-1 rounded-full">
            <XCircle size={14} /> Cancel Edit
          </button>
        )}
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-green-600">
          {isEditing ? <Edit3 /> : <PlusCircle />} {isEditing ? "Update Question" : "Add New MCQ"}
        </h2>
        <form onSubmit={handleMcqSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-lg font-bold" value={mcqData.subject} onChange={(e) => setMcqData({ ...mcqData, subject: e.target.value })} required>
              <option value="">Select Category</option>
              {categories.filter(c => !c.parent).map(main => (
                <optgroup key={main._id} label={main.name}>
                  {categories.filter(sub => sub.parent === main._id).map(sub => (
                    <option key={sub._id} value={sub.slug}>{sub.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-lg font-bold" value={mcqData.difficulty} onChange={(e) => setMcqData({ ...mcqData, difficulty: e.target.value })}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
          <textarea className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg outline-none" value={mcqData.question} rows="2" placeholder="Question..." onChange={(e) => setMcqData({ ...mcqData, question: e.target.value })} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mcqData.options.map((opt, index) => (
              <div key={index} className={`flex items-center gap-2 bg-gray-50 border p-2 rounded-xl ${mcqData.correctAnswer === opt && opt !== '' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <span className="text-gray-400 font-bold ml-2">{String.fromCharCode(65 + index)}.</span>
                <input className="flex-1 bg-transparent p-1 outline-none text-sm font-semibold" value={opt} placeholder="Option..." onChange={(e) => {
                  const updated = [...mcqData.options]; updated[index] = e.target.value; setMcqData({...mcqData, options: updated});
                }} required />
                <CheckCircle2 onClick={() => setMcqData({ ...mcqData, correctAnswer: opt })} className={`cursor-pointer ${mcqData.correctAnswer === opt && opt !== '' ? 'text-green-500' : 'text-gray-300'}`} size={22} />
              </div>
            ))}
          </div>
          <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white uppercase tracking-widest transition-all ${isEditing ? 'bg-blue-600' : 'bg-green-600'}`}>
            {isEditing ? "Update MCQ" : "Save MCQ"}
          </button>
        </form>
      </div>

      {/* BULK UPLOAD SECTION */}
      <div className="mt-8 p-10 bg-blue-600 rounded-3xl text-center shadow-xl text-white relative overflow-hidden">
        <UploadCloud size={120} className="absolute -right-10 -bottom-10 opacity-10" />
        <FileText size={48} className="mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-bold">Bulk Upload Questions</h3>
        <p className="text-blue-100 mb-6 text-sm">Upload a CSV file to add multiple MCQs in seconds.</p>
        <label className="bg-white text-blue-600 px-10 py-3 rounded-xl cursor-pointer font-black hover:bg-blue-50 inline-block transition-all">
          SELECT CSV FILE
          <input type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
        </label>
      </div>
    </div>
  );
};

export default AdminDashboard;