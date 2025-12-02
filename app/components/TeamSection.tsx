"use client";

import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function TeamSection() {
  const t = useTranslations();

  return (
    <section id="team" className="py-20 px-4 bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">
          {t("team.title")}
        </h2>

        {/* CEO Card - Centered */}
        <div className="flex justify-center">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 backdrop-blur-sm max-w-md w-full">
            {/* PRO Badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="px-3 py-1 border border-white/30 rounded text-white/80 text-xs font-medium">
                PRO
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-6 mt-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src="/images/destinations/Alla-pic.jpg" 
                    alt={t("team.ceo.name")}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-orange-500', 'to-pink-600');
                    }}
                  />
                  {/* Fallback initial */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold -z-10 bg-gradient-to-br from-orange-500 to-pink-600">
                    {t("team.ceo.name").charAt(0)}
                  </div>
                </div>
                
                {/* Verified Badge - Just the icon */}
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
              <h3 className="text-white text-xl font-bold mb-1">
                {t("team.ceo.name")}
              </h3>
              <p className="text-white/60 text-sm">
                {t("team.ceo.title")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-white text-2xl font-bold">
                  {t("team.ceo.stats.posts")}
                </div>
                <div className="text-white/50 text-xs mt-1">
                  {t("team.stats.postsLabel")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold">
                  {t("team.ceo.stats.followers")}
                </div>
                <div className="text-white/50 text-xs mt-1">
                  {t("team.stats.followersLabel")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold">
                  {t("team.ceo.stats.following")}
                </div>
                <div className="text-white/50 text-xs mt-1">
                  {t("team.stats.followingLabel")}
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-3 mb-6">
              <a 
                href={t("team.ceo.social.facebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a 
                href={t("team.ceo.social.instagram")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>

            {/* Follow Button */}
            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg">
              {t("team.followButton")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
