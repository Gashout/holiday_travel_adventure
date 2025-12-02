"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import PackageCard from "./PackageCard";
import { FaSpinner } from "react-icons/fa";

export default function PackagesSection() {
  const t = useTranslations();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      if (!response.ok) throw new Error("Failed to fetch packages");
      const data = await response.json();
      setPackages(data);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const displayedPackages = showAll ? packages : packages.slice(0, 6);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <section id="packages" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Title Section with Layered Effect */}
        <div className="text-center mb-12 relative">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white/10 absolute inset-0 flex items-center justify-center pointer-events-none">
            {t("packages.titleBg")}
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white relative z-10 mb-4">
            {t("packages.title")}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto relative z-10">
            {t("packages.subtitle")}
          </p>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading packages...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-400 text-xl">{error}</div>
          </div>
        ) : packages.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-xl">No packages available</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedPackages.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg}
                imageUrl={pkg.image}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!showAll && packages.length > 6 && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              {t("packages.loadMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

