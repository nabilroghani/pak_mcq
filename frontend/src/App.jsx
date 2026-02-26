import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Layout Components
import Navbar from "./Layout/Navbar";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminSidebar from "./Components/admin/AdminSidebar";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PastPapers from "./pages/PastPapers";
import SubmitMcqs from "./pages/SubmitMcqs";
import JobUpdates from "./pages/JobUpdates";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EBooks from "./pages/EBook";

// --- DYNAMIC COMPONENT ---
// Ab aapko GK_MCQs, Biology, PakStudy ki alag files ki zaroorat nahi
import MCQS_cart from "./Components/MCQS_cart"; 

// Auth & Admin Pages
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MCQManager from "./pages/Admin/McqManager";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import JobManager from "./pages/Admin/JobManager";
import QuizPage from "./pages/QuizPage";

const App = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserAdmin = user?.role === 'admin';
  const showAdminUI = isUserAdmin && isAdminPath;

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
          {/* Static Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/job-updates" element={<JobUpdates />} />
          <Route path="/past-papers" element={<PastPapers />} />
          <Route path="/submit" element={<SubmitMcqs />} />
          <Route path="/e-book" element={<EBooks />} />

          {/* --- THE POWER OF DYNAMIC ROUTING --- */}
          {/* Ye aik line saare subjects (Biology, Pak Study, etc.) ko handle karegi */}
          <Route path="/category/:categoryName" element={<MCQS_cart />} />
          
          {/* Quiz Route */}
          <Route path="/quiz/:id" element={<QuizPage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/mcqs" element={<ProtectedRoute><MCQManager /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><JobManager /></ProtectedRoute>} />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;