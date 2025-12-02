"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaSpinner, FaSearchPlus } from "react-icons/fa";

export default function GallerySection() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Gallery images - using gradient placeholders
  const galleryImages = [
    // Replace imageUrl with your actual image paths
    { id: 1, gradient: "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600", imageUrl: "/images/gallery/1.jpg" },
    { id: 2, gradient: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600", imageUrl: "/images/gallery/2.jpg" },
    { id: 3, gradient: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600", imageUrl: "/images/gallery/3.jpg" },
    { id: 4, gradient: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900", imageUrl: "/images/gallery/4.jpg" },
    { id: 5, gradient: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900", imageUrl: "/images/gallery/5.jpg" },
    { id: 6, gradient: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600", imageUrl: "/images/gallery/6.jpg" },
    { id: 7, gradient: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600", imageUrl: "/images/gallery/7.jpg" },
    { id: 8, gradient: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500", imageUrl: "/images/gallery/8.jpg" },
  ];

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 8);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setShowAll(true);
      setLoading(false);
    }, 500);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Title Section with Layered Effect */}
        <div className="text-center mb-12 relative">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white/10 absolute inset-0 flex items-center justify-center pointer-events-none">
            {t("gallery.titleBg")}
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white relative z-10">
            {t("gallery.title")}
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {displayedImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
            >
              <div className={`w-full h-full ${image.gradient} transition-transform duration-300 group-hover:scale-110`}>
                {/* Image with fallback to gradient */}
                <img 
                  src={image.imageUrl} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback content (visible if image fails to load) */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="text-white/20 text-4xl font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              {/* Hover overlay with search icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaSearchPlus className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50 shadow-lg"
            >
              {t("gallery.loadMore")}
              {loading && <FaSpinner className="w-4 h-4 animate-spin" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

