import React, { useState, useEffect } from "react"; // useEffect add kiya
import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaListUl,
  FaInfoCircle,
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const SubmitMCQS = () => {
  const [categories, setCategories] = useState([]); // DB se aane wali categories
  const [formData, setFormData] = useState({
    category: "", // Shuru mein khali rakha hai
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "Option A",
    explanation: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/all");

        if (Array.isArray(res.data)) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setFormData((prev) => ({ ...prev, category: res.data[0].name }));
          }
        }
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mcqData = {
        question: formData.question,
        options: [
          formData.optionA,
          formData.optionB,
          formData.optionC,
          formData.optionD,
        ],
        correctAnswer: formData.correctAnswer.replace("Option ", ""),
        // Category ko slug format mein bhejne ke liye (jesa aap pehle kar rahe thay)
        category: formData.category,
        explanation: formData.explanation,
        status: "pending",
      };

      const res = await axios.post(
        "http://localhost:5000/api/mcqs/submit-user",
        mcqData,
      );

      if (res.data.success) {
        Swal.fire("Success!", "Your MCQ submitted for review.", "success");
        setFormData({
          category: categories[0]?.name || "",
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "Option A",
          explanation: "",
        });
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-4 tracking-tighter">
            CONTRIBUTE <span className="text-cyan-500">MCQS</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Help other students by sharing quality preparation material.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Guidelines Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-950 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaInfoCircle className="text-cyan-400" /> Guidelines
              </h3>
              <ul className="space-y-4 opacity-90">
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />{" "}
                  Ensure question is clear.
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />{" "}
                  Provide four distinct options.
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />{" "}
                  Ghalat MCQs delete kar diye jayenge.
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-black text-blue-950 uppercase tracking-widest flex items-center gap-2">
                    <FaListUl className="text-cyan-500" /> Select Category
                  </label>

                  {/* DYNAMIC SELECT BOX */}
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-cyan-500 appearance-none transition-all cursor-pointer"
                  >
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.parent ? `↳ ${cat.name}` : cat.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories found</option>
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-blue-950 uppercase tracking-widest">
                    The Question
                  </label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your MCQ question here..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-cyan-500 resize-none transition-all"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["A", "B", "C", "D"].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Option {label}
                      </label>
                      <input
                        name={`option${label}`}
                        value={formData[`option${label}`]}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder={`Enter option ${label}`}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-blue-950 uppercase tracking-widest text-cyan-600">
                      Correct Answer
                    </label>
                    <select
                      name="correctAnswer"
                      value={formData.correctAnswer}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-cyan-50 border border-cyan-100 rounded-2xl outline-none"
                    >
                      <option>Option A</option>
                      <option>Option B</option>
                      <option>Option C</option>
                      <option>Option D</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-blue-950 uppercase tracking-widest">
                      Short Explanation
                    </label>
                    <input
                      name="explanation"
                      value={formData.explanation}
                      onChange={handleChange}
                      type="text"
                      placeholder="Optional explanation..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-cyan-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl flex items-center justify-center gap-3 transition-all duration-300 group"
                >
                  <FaCloudUploadAlt className="text-2xl group-hover:-translate-y-1 transition-transform" />
                  SUBMIT MCQ FOR REVIEW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitMCQS;
