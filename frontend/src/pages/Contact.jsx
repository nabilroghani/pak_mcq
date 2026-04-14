import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return Swal.fire('Error', 'Please fill name, email and message fields!', 'error');
    }

    try {
      Swal.fire({
        title: 'Sending Message...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const res = await axios.post("http://localhost:5000/api/contacts/send", formData);

      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Aapka message record mein save ho gaya hai. Admin jald aap se rabta karega.',
          confirmButtonColor: '#0f172a'
        });

        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire('Error', 'Server connection error! Please check if your backend is running.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-900/5 text-blue-900 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 border border-blue-900/10">
             Help Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-4 tracking-tighter">
            GET IN <span className="text-cyan-500">TOUCH</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Exam preparation mein koi masla ho ya koi sawal, humse rabta karein.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col lg:flex-row border border-white">
          
          {/* Left Side: Professional Info Panel */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-900 via-blue-950 to-black p-10 md:p-14 text-white relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <h2 className="text-3xl font-black mb-10 tracking-tight">Contact <br/> Information</h2>
            
            <div className="space-y-10 relative z-10">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-blue-950 transition-all duration-500 shadow-xl border border-white/10">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-[10px] text-cyan-400 uppercase font-black tracking-[0.2em] mb-1">Call Us</p>
                  <p className="text-lg font-bold">+92 333 8005540</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-blue-950 transition-all duration-500 shadow-xl border border-white/10">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-[10px] text-cyan-400 uppercase font-black tracking-[0.2em] mb-1">Email Us</p>
                  <p className="text-lg font-bold">paklearnersofficial@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-blue-950 transition-all duration-500 shadow-xl border border-white/10">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-[10px] text-cyan-400 uppercase font-black tracking-[0.2em] mb-1">Our Location</p>
                  <p className="text-lg font-bold">Peshawar, KP, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Updated Social Media with WhatsApp */}
            <div className="mt-20 relative z-10">
              <p className="text-white/40 mb-6 font-black uppercase tracking-[0.3em] text-[10px]">Connect With Us</p>
              <div className="flex gap-4">
                {[
                  { icon: FaFacebookF, link: "https://www.facebook.com/share/18P9BbsVuz/" },
                  { icon: FaTwitter, link: "#" },
                  { icon: FaInstagram, link: "#" },
                  { icon: FaWhatsapp, link: "https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08" }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 hover:bg-white hover:text-blue-900 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10 shadow-lg hover:-translate-y-2"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Modern Form */}
          <div className="lg:w-3/5 p-10 md:p-14 bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-blue-950 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-blue-950 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@mail.com" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-blue-950 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+92 3xx xxxxxxx" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-blue-950 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Topic of message" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-blue-950 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  rows="5" required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us how we can help you..." 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all resize-none font-medium"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full md:w-max px-12 py-5 bg-blue-950 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 active:scale-95 group flex items-center justify-center gap-3"
              >
                Send Message <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;