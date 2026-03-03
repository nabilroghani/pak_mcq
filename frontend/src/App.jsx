import React from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

// Layout Components
import Navbar from "./Layout/Navbar";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminSidebar from "./Components/Admin/AdminSidebar";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PastPapers from "./pages/PastPapers";
import SubmitMcqs from "./pages/SubmitMcqs";
import JobUpdates from "./pages/JobUpdates";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EBooks from "./pages/EBook";

// Components
import MCQS_cart from "./Components/MCQS_cart";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MCQManager from "./pages/Admin/McqManager";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import JobManager from "./pages/Admin/JobManager";
import QuizPage from "./pages/QuizPage";
import CategoryManager from "./pages/Admin/CategoryManager";
import CreateQuiz from "./pages/Admin/CreateQuiz";
import SharedQuiz from "./pages/SharedQuiz";
import AdminMessages from "./pages/Admin/AdminMessages"; 

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserAdmin = user?.role === 'admin';
  const showAdminUI = isUserAdmin && isAdminPath;

  // Check current category from URL for the Floating Button
  const categoryInUrl = location.pathname.startsWith("/category/") 
    ? location.pathname.split("/").pop() 
    : "General";

  return (
    <div className={`min-h-screen ${showAdminUI ? "flex bg-white" : "bg-gray-50"}`}>

      {showAdminUI ? (
        <AdminSidebar />
      ) : (
        !isAdminPath && (
          <>
            <Navbar />
            <Header />
          </>
        )
      )}

      <main className={showAdminUI ? "flex-1 h-screen overflow-y-auto" : "max-w-7xl mx-auto px-4 mt-8 pb-10 w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/job-updates" element={<JobUpdates />} />
          <Route path="/past-papers" element={<PastPapers />} />
          <Route path="/submit" element={<SubmitMcqs />} />
          <Route path="/e-book" element={<EBooks />} />
          <Route path="/quiz-challenge/:slug" element={<SharedQuiz />} />
          <Route path="/category/:categoryName" element={<MCQS_cart />} />

          {/* Quiz Route Fix: Now accepts categoryName */}
          <Route path="/quiz/:categoryName" element={<QuizPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/mcqs" element={<ProtectedRoute><MCQManager /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><JobManager /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoryManager /></ProtectedRoute>} />
          <Route path="/admin/quiz-builder" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* --- FLOATING QUIZ BUTTON --- */}
      {!isAdminPath && !location.pathname.startsWith("/quiz") && location.pathname !== "/login" && (
        <button 
          onClick={() => navigate(`/quiz/${categoryInUrl}`)}
          className="fixed bottom-10 right-10 bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-7 py-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center gap-3 font-black uppercase tracking-tighter border-4 border-white"
        >
          <FaPlayCircle size={28} />
          <span>Start {categoryInUrl.replace(/-/g, ' ')} Quiz</span>
        </button>
      )}

      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;