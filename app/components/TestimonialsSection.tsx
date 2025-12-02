"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

export default function TestimonialsSection() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      nameKey: "testimonials.reviews.james.name",
      commentKey: "testimonials.reviews.james.comment",
      rating: 5,
      image: "/images/testimonials/james.jpg", // Replace with actual image path
      fallbackClass: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      nameKey: "testimonials.reviews.sarah.name",
      commentKey: "testimonials.reviews.sarah.comment",
      rating: 5,
      image: "/images/testimonials/sarah.jpg", // Replace with actual image path
      fallbackClass: "bg-gradient-to-br from-pink-500 to-orange-500"
    },
    {
      nameKey: "testimonials.reviews.michael.name",
      commentKey: "testimonials.reviews.michael.comment",
      rating: 5,
      image: "/images/testimonials/michael.jpg", // Replace with actual image path
      fallbackClass: "bg-gradient-to-br from-green-500 to-teal-600"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image/Visual */}
          <div className="relative">
            {/* Background decorative text */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white/5 absolute -top-10 left-0 pointer-events-none">
              {t("testimonials.titleBg")}
            </h2>
            
            {/* Main visual - Suitcase with landmarks */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Placeholder for travel image - using gradient */}
                {/* Main Image - Replace src with your image path */}
                <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="/images/testimonials-main.jpg" 
                    alt="Travel Experiences" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-gray-200', 'via-gray-100', 'to-white');
                    }}
                  />
                  {/* Fallback content if image fails */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="text-center p-8">
                      <div className="w-48 h-64 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-xl mb-4 flex items-center justify-center">
                        <div className="text-white text-6xl">🧳</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className="relative z-10">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8">
              {t("testimonials.title")}
            </h2>

            {/* Google Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">Facebook</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">{t("testimonials.totalReviews")}</span>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/10">
              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-lg relative`}>
                  <img 
                    src={currentTestimonial.image} 
                    alt={t(currentTestimonial.nameKey)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add(currentTestimonial.fallbackClass);
                    }}
                  />
                  {/* Fallback initial */}
                  <div className={`absolute inset-0 flex items-center justify-center text-white text-xl font-bold -z-10 ${currentTestimonial.fallbackClass}`}>
                    {t(currentTestimonial.nameKey).charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {t(currentTestimonial.nameKey)}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Icon */}
              <FaQuoteLeft className="w-8 h-8 text-orange-400 mb-4 opacity-50" />

              {/* Comment */}
              <p className="text-white/90 text-lg leading-relaxed italic">
                {t(currentTestimonial.commentKey)}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all group"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all group"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2 ml-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-orange-400 w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
