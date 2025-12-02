"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (newLocale: string) => {
    setIsOpen(false);
    // Replace locale in URL
    const path = window.location.pathname.replace(
      `/${locale}`,
      `/${newLocale}`
    );
    window.location.href = path || `/${newLocale}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
      >
        {locale === "en" ? "English" : "العربية"}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <button
            onClick={() => toggleLanguage("en")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
              locale === "en" ? "bg-blue-100 text-blue-600 font-medium" : ""
            }`}
          >
            English
          </button>
          <button
            onClick={() => toggleLanguage("ar")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
              locale === "ar" ? "bg-blue-100 text-blue-600 font-medium" : ""
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
