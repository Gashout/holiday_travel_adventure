"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { FaMapMarkedAlt, FaUserTie, FaHeadset, FaFileAlt } from "react-icons/fa";
import { WHATSAPP_URL } from "@/app/config/whatsapp";

export default function AboutSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const features = [
    {
      key: "personalized",
      icon: FaMapMarkedAlt,
    },
    {
      key: "guides",
      icon: FaUserTie,
    },
    {
      key: "support",
      icon: FaHeadset,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className={`relative ${isRTL ? "lg:order-2" : ""}`}>
            {/* Background Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-gray-800 absolute -top-8 -left-4 md:-left-8 pointer-events-none opacity-50">
              {t("about.titleBg")}
            </h2>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white relative z-10 mb-6">
              {t("about.title")}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 mb-8 text-white/90 relative z-10">
              <p className="text-base md:text-lg leading-relaxed">
                {t("about.paragraph1")}
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                {t("about.paragraph2")}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.key}
                    className="bg-black rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[140px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <p className="text-white text-sm font-medium">
                      {t(`about.features.${feature.key}.title`)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="relative z-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {t("about.cta")}
                <FaFileAlt className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className={`relative ${isRTL ? "lg:order-1" : ""}`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for image - using gradient background */}
              {/* Image - Replace src with your image path */}
              <div className="aspect-[4/5] relative bg-gray-200">
                <img 
                  src="/images/destinations/Vacation-Planning.jpg" 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-400', 'via-purple-500', 'to-pink-500');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

