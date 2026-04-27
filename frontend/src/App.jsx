import React, { useEffect } from "react"; // useEffect add kiya
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ReactGA from "react-ga4"; // Analytics library import ki

// Layout Components
import Navbar from "./Layout/Navbar";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminSidebar from "./Components/Admin/AdminSidebar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PastPapers from "./pages/PastPapers";
import SubmitMcqs from "./pages/SubmitMcqs";
import JobUpdates from "./pages/JobUpdates";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EBooks from "./pages/EBook";
import MCQS_cart from "./Components/MCQS_cart";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MCQManager from "./pages/Admin/McqManager";
import AdminReviewMCQs from "./pages/Admin/AdminReviewMCQs";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import JobManager from "./pages/Admin/JobManager";
import CategoryManager from "./pages/Admin/CategoryManager";
import CreateQuiz from "./pages/Admin/CreateQuiz";
import AdminMessages from "./pages/Admin/AdminMessages";
import EBookManager from "./pages/Admin/AddBookForm";
import Quiz from "./pages/Quiz";

// --- Google Analytics Initialization ---
const MEASUREMENT_ID = "G-KQGQFZCT91";
ReactGA.initialize(MEASUREMENT_ID);

const App = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Page View Tracking Logic
  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  const isAdminPath = location.pathname.startsWith("/admin");
  // const isCategoryPage = location.pathname.startsWith("/category/");
  const isFullWidthPage = location.pathname === "/" || location.pathname.startsWith("/category/");
  const isUserAdmin = user?.role === "admin";
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

      {/* <main className={showAdminUI ? "flex-1 h-screen overflow-y-auto" : isCategoryPage ? "w-full max-w-none mx-0 px-0 mt-0 pb-10 md:max-w-7xl md:mx-auto md:px-4 md:mt-8" : "max-w-7xl mx-auto px-4 mt-8 pb-10 w-full"}> */}
      <main className={showAdminUI ? "flex-1 h-screen overflow-y-auto" : isFullWidthPage ? "w-full max-w-none mx-0 px-0 mt-0 pb-10 md:max-w-7xl md:mx-auto md:px-4 md:mt-8" : "max-w-7xl mx-auto px-4 mt-8 pb-10 w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/job-updates" element={<JobUpdates />} />
          <Route path="/past-papers" element={<PastPapers />} />
          <Route path="/submit" element={<SubmitMcqs />} />
          <Route path="/e-book" element={<EBooks />} />
          <Route path="/quiz-General" element={<Quiz/>}/>
          <Route path="/category/:categoryName" element={<MCQS_cart />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/mcqs" element={<ProtectedRoute><MCQManager /></ProtectedRoute>} />
          <Route path="/admin/review-mcqs" element={<ProtectedRoute><AdminReviewMCQs /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><JobManager /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoryManager /></ProtectedRoute>} />
          <Route path="/admin/quiz-builder" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          <Route path="/admin/ebooks" element={<ProtectedRoute><EBookManager /></ProtectedRoute>} />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;
