"use client";

import { useTranslations } from "next-intl";
import { FaPlane, FaPassport, FaGraduationCap } from "react-icons/fa";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  plane: FaPlane,
  passport: FaPassport,
  graduation: FaGraduationCap,
};

export default function ServiceCard({
  icon,
  titleKey,
  descriptionKey,
  highlightsKey,
}: {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  highlightsKey?: string;
}) {
  const t = useTranslations();
  const Icon = iconMap[icon] || FaPlane;
  const highlights = highlightsKey
    ? (t.raw(highlightsKey) as string[])
    : undefined;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-8 h-full">
      <div className="mb-6 flex justify-center">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        {t(titleKey)}
      </h3>
      <p className="text-gray-600 text-center mb-6">{t(descriptionKey)}</p>
      {highlights && Array.isArray(highlights) && (
        <div className="space-y-2">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
