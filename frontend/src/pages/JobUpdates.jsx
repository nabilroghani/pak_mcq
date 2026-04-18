import React, { useState, useEffect } from "react";
import { FiMapPin, FiCalendar, FiBriefcase, FiDownload } from "react-icons/fi";
import api from "../../utils/api"; 

export default function JobUpdates() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = api.defaults.baseURL.replace('/api', '');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/all");
        if (res.data.success) setJobs(res.data.data);
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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-600 inline-block">
        Latest Job Opportunities 2026
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const imagePath = job.jobImage?.startsWith('http')
              ? job.jobImage
              : `${API_BASE_URL}/${job.jobImage?.replace(/\\/g, '/')}`;

            return (
              <div key={job._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full overflow-hidden group">

                {/* Job Image Advertisement */}
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  {job.jobImage ? (
                    <img
                      src={imagePath}
                      alt={job.jobTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=Job+Ad";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FiBriefcase size={40} />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{job.jobTitle}</h3>
                  <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">
                    {job.organization}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiMapPin className="mr-2 text-blue-500" /> {job.location || "Pakistan"}
                    </div>
                    <div className="flex items-center text-red-500 text-sm font-bold">
                      <FiCalendar className="mr-2" /> Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "Contact Office"}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 italic">
                    {job.description}
                  </p>

                  <div className="mt-auto flex gap-3">
                    <button
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-md active:scale-95"
                      onClick={() => window.open(imagePath, "_blank")}
                    >
                      View Ad
                    </button>

                    {job.jobImage && (
                      <button
                        onClick={() => handleDownload(imagePath, `${job.jobTitle}-ad.jpg`)}
                        className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
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
          <div className="col-span-full text-center py-20 text-gray-400">
             <p className="text-lg font-medium">No job updates available.</p>
          </div>
        )}
      </div>
    </div>
  );
}