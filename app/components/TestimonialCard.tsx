"use client";

import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  nameKey: string;
  commentKey: string;
  rating: number;
}

export default function TestimonialCard({
  nameKey,
  commentKey,
  rating,
}: TestimonialCardProps) {
  const t = useTranslations();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 mb-4 italic">"{t(commentKey)}"</p>
      <p className="font-bold text-gray-900">- {t(nameKey)}</p>
    </div>
  );
}
