"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        comment: ""
      });
      alert(t("contact.successMessage"));
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Side - Contact Form */}
          <div className="bg-gray-800 p-8 md:p-12 lg:p-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              {t("contact.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white text-sm mb-2">
                    {t("contact.form.name")}*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white text-sm mb-2">
                    {t("contact.form.phone")}*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Email and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-white text-sm mb-2">
                    {t("contact.form.email")}*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white text-sm mb-2">
                    {t("contact.form.subject")}*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div>
                <label htmlFor="comment" className="block text-white text-sm mb-2">
                  {t("contact.form.comment")}*
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50 shadow-lg"
              >
                {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Side - Map and Contact Info */}
          <div className="relative bg-white">
            {/* Map - Using a placeholder with gradient */}
            <a 
              href="https://maps.app.goo.gl/YBV8cWbQfwAKdGcG9?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-64 lg:h-full bg-gradient-to-br from-green-200 via-green-300 to-green-400 relative cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="Open location in Google Maps"
            >
              {/* Map placeholder with grid pattern */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              {/* Map marker indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Road lines for map effect */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#059669" strokeWidth="3" />
                <line x1="0" y1="60%" x2="100%" y2="58%" stroke="#059669" strokeWidth="2" />
                <line x1="40%" y1="0" x2="45%" y2="100%" stroke="#059669" strokeWidth="2" />
              </svg>
            </a>

            {/* Contact Info Card Overlay */}
            <div className="absolute bottom-8 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("contact.info.title")}
              </h3>

              <div className="space-y-4">
                {/* Call Us */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t("contact.info.callUs")}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{t("contact.info.phone")}</span>
                  </div>
                </div>

                {/* Email Us */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t("contact.info.emailUs")}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{t("contact.info.email")}</span>
                  </div>
                </div>

                {/* Our Location */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t("contact.info.location")}
                  </h4>
                  <div className="flex items-start gap-2 text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 text-orange-400 mt-1" />
                    <span className="text-sm">{t("contact.info.address")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
