import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMapPin, FiCalendar, FiBriefcase, FiDownload } from "react-icons/fi";

export default function JobUpdates() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Base URL for Backend
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs/all`);
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

  if (loading) return <div className="text-center p-10 font-bold text-blue-600">Loading Latest Jobs...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-blue-600 inline-block">
        Latest Job Opportunities 2026
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const imagePath = job.jobImage?.startsWith('http')
              ? job.jobImage
              : `${API_BASE_URL}/${job.jobImage?.replace(/\\/g, '/')}`;

            return (
              <div key={job._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">

                {/* Job Image Advertisement */}
                <div className="relative group h-48 bg-gray-100 overflow-hidden">
                  {job.jobImage ? (
                    
                    <img
                      src={job.jobImage}  
                      alt="Job Ad"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x200?text=No+Image+Available";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiBriefcase size={40} />
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-900 mb-1 leading-tight">{job.jobTitle}</h3>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
                    {job.organization}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiMapPin className="mr-2 text-blue-500" /> {job.location || "Pakistan"}
                    </div>
                    <div className="flex items-center text-red-500 text-sm font-bold">
                      <FiCalendar className="mr-2" /> Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 italic">
                    {job.description}
                  </p>

                  <div className="mt-auto flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-bold shadow-md active:scale-95"
                      onClick={() => window.open(imagePath, "_blank")}
                    >
                      View Full Ad
                    </button>

                    {job.jobImage && (
                      <button
                        onClick={() => handleDownload(imagePath, `${job.jobTitle}-ad.jpg`)}
                        className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        title="Download Advertisement"
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
          <div className="col-span-full text-center py-20 text-gray-500">
            <FiBriefcase size={50} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No new job updates at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}