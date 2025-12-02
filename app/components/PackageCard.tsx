"use client";

import { useTranslations, useLocale } from "next-intl";
import { FaArrowRight } from "react-icons/fa";
import { WHATSAPP_URL } from "@/app/config/whatsapp";
import type { Package } from "@/lib/supabase";

interface PackageCardProps {
  pkg?: Package;
  packageKey?: string;
  imageUrl?: string;
}

export default function PackageCard({
  pkg,
  packageKey,
  imageUrl,
}: PackageCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const packageData = pkg
    ? {
        name: locale === "ar" ? pkg.name_ar : pkg.name_en,
        description: locale === "ar" ? pkg.description_ar : pkg.description_en,
        days: pkg.days,
        nights: pkg.nights,
        price: pkg.price,
      }
    : (t.raw(`packages.packages.${packageKey}`) as {
        name: string;
        description: string;
        days: string;
        nights: string;
        price: string;
      });

  const finalImageUrl = pkg?.image || imageUrl;

  // Gradient backgrounds for different destinations
  const imageGradients: Record<string, string> = {
    bali: "bg-gradient-to-br from-blue-400 via-teal-500 to-green-600",
    bangkok: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    kualalumpur: "bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600",
    hochiminh: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
    taiwan: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
    singapore: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
  };

  const gradient = packageKey
    ? imageGradients[packageKey] || imageGradients.bali
    : "bg-gradient-to-br from-blue-400 via-teal-500 to-green-600";

  return (
    <div className="bg-transparent rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors flex flex-col h-full">
      {/* Image Area */}
      <div className={`relative h-48 ${gradient} overflow-hidden flex-shrink-0`}>
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt={packageData.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/20 text-4xl font-bold">
              {packageData.name.split(",")[0]?.charAt(0) || "T"}
            </div>
          </div>
        )}
        
        {/* Days/Nights Badge */}
        <div className="absolute bottom-3 left-3 bg-orange-400/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white text-sm font-medium">
            {packageData.days} {t("packages.days")} {packageData.nights} {t("packages.nights")}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 bg-transparent flex flex-col flex-grow">
        {/* Destination Name */}
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
          {packageData.name}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm mb-4 line-clamp-2 flex-grow">
          {packageData.description}
        </p>

        {/* Action Buttons and Price */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-green-900/50 border border-green-700/50 text-white text-sm font-medium rounded hover:bg-green-800/50 transition-colors"
          >
            {t("packages.bookNow")}
            <FaArrowRight className="w-3 h-3" />
          </a>
          <div className="text-white text-sm font-medium">
            {t("packages.startFrom")} : ${packageData.price}
          </div>
        </div>
      </div>
    </div>
  );
}

