"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = locale === "ar";
  const otherLocale = locale === "en" ? "ar" : "en";

  const navItems = [
    { key: "destination", href: "#destinations" },
    { key: "about", href: "#about" },
    { key: "package", href: "#packages" },
    { key: "gallery", href: "#gallery" },
    { key: "testimonials", href: "#testimonials" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              {/* Mountain peak icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M8 24 L16 8 L24 24 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M12 20 L16 12 L20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              HTA
            </span>
          </Link>

          {/* Desktop Navigation Menu - Centered */}
          <div className={`hidden lg:flex items-center gap-6 xl:gap-8 absolute ${isRTL ? 'right-1/2 transform translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'}`}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-white text-sm xl:text-base font-medium hover:text-orange-300 transition-colors whitespace-nowrap"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Right Side - Hotline & Language Switcher */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Hotline Section Removed */}

            {/* Language Switcher */}
            <Link
              href="/"
              locale={otherLocale}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm md:text-base border border-white/30"
            >
              {otherLocale === "ar" ? "العربية" : "English"}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-base font-medium hover:text-orange-300 transition-colors py-2"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              {/* Mobile Hotline Removed */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
