import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 mb-4 tracking-tight">
            GET IN <span className="text-cyan-500">TOUCH</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have a question or need help with your exam preparation? Drop us a message and our team will get back to you shortly.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Side: Contact Info (Dark Section) */}
          <div className="lg:w-2/5 bg-blue-950 p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-900 rounded-full opacity-50"></div>
            <div className="absolute bottom-20 -left-10 w-20 h-20 bg-cyan-500 rounded-full opacity-20"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <p className="text-blue-200 mb-10 text-lg">Fill out the form and our team will respond within 24 hours.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300 shadow-lg">
                      <FaPhoneAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-300 uppercase font-bold tracking-widest">Phone</p>
                      <p className="text-lg">+92 300 0000000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300 shadow-lg">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-300 uppercase font-bold tracking-widest">Email</p>
                      <p className="text-lg">info@paklearners.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300 shadow-lg">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-300 uppercase font-bold tracking-widest">Location</p>
                      <p className="text-lg">Peshawar, KP, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-16">
                <p className="text-blue-300 mb-4 font-bold uppercase tracking-widest text-xs">Follow Us</p>
                <div className="flex gap-4">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                    <a key={index} href="#" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form (Light Section) */}
          <div className="lg:w-3/5 p-8 md:p-12 bg-white">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-950 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-950 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="example@mail.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-950 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+92 3xx xxxxxxx" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                  />
                </div>
                {/* Subject/Comment Line */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-950 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-950 uppercase tracking-wider">Your Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your message here..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full md:w-max px-12 py-4 bg-blue-950 hover:bg-cyan-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;