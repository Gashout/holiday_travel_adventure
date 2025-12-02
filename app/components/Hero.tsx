"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { useState, useEffect } from "react";
import { FaFacebook, FaChevronLeft, FaChevronRight, FaFileAlt, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/app/config/whatsapp";

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/hero/hero-1.png",
    "/images/hero/hero-2.png",
    "/images/hero/hero-3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dynamic Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide})`
            }}
          />
          
          {/* Overlay Gradients - consistent across all slides */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-purple-900/40 to-indigo-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className={`flex flex-col lg:flex-row items-center lg:items-end justify-between min-h-[80vh] py-20 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left Side - Social Media & Navigation */}
          <div className={`hidden lg:flex flex-col gap-6 mb-auto mt-20 ${isRTL ? 'items-end' : 'items-start'}`}>
            {/* Social Media Icons */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61550335186337"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex gap-2 mt-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-orange-500" : "w-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Main Content */}
          {/* Right Side - Main Content */}
          <div className={`lg:w-3/5 xl:w-1/2 text-white space-y-4 ${isRTL ? 'lg:text-left' : 'lg:text-right'} flex flex-col ${isRTL ? 'lg:items-start' : 'lg:items-end'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-none drop-shadow-lg tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white/90 drop-shadow-md tracking-wide uppercase">
              {t("hero.subtitle")}
            </p>
            <p className={`text-base md:text-lg leading-relaxed text-white/80 max-w-xl drop-shadow-md ${isRTL ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
              {t("hero.description")}
            </p>
            <div className="pt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t("hero.cta")}
                <FaFileAlt className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Social Media (shown only on mobile) */}
      <div className={`lg:hidden absolute bottom-8 flex gap-3 z-20 ${isRTL ? 'right-4' : 'left-4'}`}>
        <a
          href="https://www.facebook.com/profile.php?id=61550335186337"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook className="w-4 h-4" />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
