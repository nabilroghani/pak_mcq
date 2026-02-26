import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, User, Lock } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MCQComments = ({ mcqId }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // 1. Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!mcqId) return;
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/comments/${mcqId}`);
        if (res.data.success) {
          setAllComments(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [mcqId]);

  // 2. Post Comment
  const handlePostComment = async (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to post a comment!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#1565C0',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) navigate('/login');
      });
      return;
    }

    if (!comment.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/comments/add", {
        mcqId,
        userName: user?.name || "User",
        commentText: comment, // Match with Backend
      });

      if (res.data.success) {
        setAllComments([res.data.data, ...allComments]);
        setComment("");
        Swal.fire({ icon: 'success', title: 'Posted!', timer: 1000, showConfirmButton: false });
      }
    } catch (err) {
      console.error("Post Error:", err.response?.data);
      Swal.fire({ icon: 'error', title: 'Oops...', text: err.response?.data?.message || 'Failed to post' });
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex items-center gap-2">
        <MessageSquare size={20} className="text-[#1565C0]" />
        <h3 className="font-bold text-gray-800">Discussion ({allComments.length})</h3>
      </div>

      <div className="p-6">
        <form onSubmit={handlePostComment} className="relative mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={token ? "Write your comment..." : "Please login to join the discussion"}
            className={`w-full p-4 rounded-xl border-2 transition-all outline-none min-h-[100px] text-sm ${
              token ? 'border-gray-100 focus:border-blue-200 bg-gray-50/30' : 'border-gray-100 bg-gray-100/50 cursor-not-allowed'
            }`}
            disabled={!token}
          />
          <div className="flex justify-between items-center mt-2">
            {!token && <p className="text-xs text-red-400 flex items-center gap-1 font-medium"><Lock size={12} /> Login to unlock</p>}
            <button
              type="submit"
              disabled={!comment.trim() || !token}
              className={`ml-auto flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                comment.trim() && token ? 'bg-[#1565C0] text-white shadow-lg active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Post Comment <Send size={14} />
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-400 text-sm">Loading...</p>
          ) : allComments.length > 0 ? (
            allComments.map((item) => (
              <div key={item._id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1565C0] shrink-0 border border-blue-100"><User size={20} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-gray-800">{item.userName}</h4>
                    <span className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border border-transparent group-hover:border-gray-100 transition-all">{item.commentText}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm italic">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQComments;