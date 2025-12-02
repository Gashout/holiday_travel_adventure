"use client";

import { useTranslations, useLocale } from "next-intl";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "@/navigation";
import { WHATSAPP_URL } from "@/app/config/whatsapp";
import type { Destination } from "@/lib/supabase";

interface DestinationCardProps {
  destination?: Destination;
  destinationKey?: string;
  imageUrl?: string;
}

export default function DestinationCard({
  destination,
  destinationKey,
  imageUrl,
}: DestinationCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  
  // Support both old (translation-based) and new (API-based) approaches
  const dest = destination
    ? {
        name: locale === "ar" ? destination.name_ar : destination.name_en,
        people: destination.people,
        days: destination.days,
        nights: destination.nights,
        price: destination.price,
      }
    : (t.raw(`destinations.destinations.${destinationKey}`) as {
        name: string;
        people: string;
        days: string;
        nights: string;
        price: string;
      });

  const finalImageUrl = destination?.image || imageUrl;

  // Placeholder gradient images for destinations
  const imageGradients: Record<string, string> = {
    bali: "bg-gradient-to-br from-blue-400 via-teal-500 to-green-600",
    bangkok: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    kualalumpur: "bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600",
    hochiminh: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
  };

  const gradient = destinationKey
    ? imageGradients[destinationKey] || imageGradients.bali
    : "bg-gradient-to-br from-blue-400 via-teal-500 to-green-600";

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className={`h-48 ${gradient} relative overflow-hidden`}>
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/20 text-6xl font-bold">
              {dest.name.split(",")[0].charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Destination Name */}
        <h3 className="text-xl font-semibold text-white mb-4">
          {dest.name}
        </h3>

        {/* Details */}
        <div className="space-y-3 mb-6">

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaCalendarAlt className="w-4 h-4" />
            <span>
              {dest.days} {t("destinations.days")} {dest.nights}{" "}
              {t("destinations.nights")}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors text-sm font-medium flex items-center gap-1"
            >
              {t("destinations.bookNow")}
              <FaArrowRight className="w-3 h-3" />
            </a>
            <div className="text-green-500 font-semibold text-sm">
              {t("destinations.startFrom")} : ${dest.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

