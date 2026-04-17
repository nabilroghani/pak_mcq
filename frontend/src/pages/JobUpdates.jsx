import React, { useState, useEffect } from "react";
import api from "../utils/api"; // Aapka custom axios instance
import { FiMapPin, FiCalendar, FiBriefcase, FiDownload, FiExternalLink } from "react-icons/fi";

export default function JobUpdates() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/all");
        if (res.data.success) {
          setJobs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // --- DOWNLOAD FUNCTIONALITY ---
  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "job-advertisement.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse">Fetching Latest Jobs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 font-sans antialiased">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">
          LATEST <span className="text-blue-600">JOBS</span> 2026
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Daily career updates from top organizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            // Path cleanup: Agar full URL nahi hai toh base URL lagao
            const imagePath = job.jobImage?.startsWith('http')
              ? job.jobImage
              : `${API_BASE_URL}/${job.jobImage?.replace(/\\/g, '/')}`;

            return (
              <div key={job._id} className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col hover:-translate-y-2 transition-all duration-300">

                {/* Advertisement Preview */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  {job.jobImage ? (
                    <img
                      src={imagePath}
                      alt={job.jobTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=Job+Advertisement";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                      <FiBriefcase size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    New Opening
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">
                      {job.organization}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {job.jobTitle}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-500 text-xs font-semibold">
                      <FiMapPin className="mr-2 text-blue-500" size={16} /> {job.location || "Remote / Pakistan"}
                    </div>
                    <div className="flex items-center text-rose-500 text-xs font-black bg-rose-50 w-fit px-3 py-1 rounded-lg">
                      <FiCalendar className="mr-2" size={14} /> 
                      Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm line-clamp-3 italic mb-6 leading-relaxed">
                    {job.description || "Click 'View Full Ad' to see details and eligibility criteria for this position."}
                  </p>

                  <div className="mt-auto flex gap-3">
                    <button
                      className="flex-[3] bg-slate-900 text-white py-3.5 rounded-2xl hover:bg-blue-600 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-slate-200"
                      onClick={() => window.open(imagePath, "_blank")}
                    >
                      <FiExternalLink size={16} /> View Ad
                    </button>

                    {job.jobImage && (
                      <button
                        onClick={() => handleDownload(imagePath, `${job.jobTitle}-ad.jpg`)}
                        className="flex-1 bg-slate-100 text-slate-600 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center active:scale-95"
                        title="Download for Offline"
                      >
                        <FiDownload size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-32">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBriefcase size={40} className="text-slate-200" />
            </div>
            <h3 className="text-slate-800 font-black text-xl italic">NO RECENT UPDATES</h3>
            <p className="text-slate-400 text-sm mt-1">Please check back later for new career opportunities.</p>
          </div>
        )}
      </div>

      <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          Powered by Nabil Ahmad Developer Portfolio
        </p>
      </footer>
    </div>
  );
}