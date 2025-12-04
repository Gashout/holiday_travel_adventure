"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DestinationCard from "./DestinationCard";
import type { Destination } from "@/lib/supabase";

export default function DestinationsSection() {
  const t = useTranslations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      if (!response.ok) throw new Error("Failed to fetch destinations");
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Scroll by one card width (approximate based on screen size)
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardsToShow = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
      const scrollAmount = containerWidth / cardsToShow;
      
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="destinations" className="py-20 px-4 bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title Section with Layered Effect */}
        <div className="text-center mb-8 relative">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white/10 absolute inset-0 flex items-center justify-center pointer-events-none">
            {t("destinations.titleBg")}
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white relative z-10 mb-4">
            {t("destinations.title")}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto relative z-10">
            {t("destinations.subtitle")}
          </p>
        </div>

        {/* Destinations Cards with Navigation */}
        <div className="relative">
          {/* Left Arrow - Now visible on mobile */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 lg:-translate-x-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 bg-gray-900/80 lg:bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center text-white z-20 shadow-lg lg:shadow-none"
            aria-label="Previous destinations"
          >
            <FaChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>

          {/* Cards Container */}
          <div className="bg-gray-800/50 rounded-3xl p-4 md:p-6 lg:p-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Loading destinations...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-red-400 text-xl">{error}</div>
              </div>
            ) : destinations.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400 text-xl">No destinations available</div>
              </div>
            ) : (
              <div
                ref={scrollContainerRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
              >
                {destinations.map((destination) => (
                  <div 
                    key={destination.id} 
                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start"
                  >
                    <DestinationCard
                      destination={destination}
                      imageUrl={destination.image}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Arrow - Now visible on mobile */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 lg:translate-x-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 bg-gray-900/80 lg:bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center text-white z-20 shadow-lg lg:shadow-none"
            aria-label="Next destinations"
          >
            <FaChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

