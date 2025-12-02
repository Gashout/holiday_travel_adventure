"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFacebookF, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "@/navigation";
import { WHATSAPP_URL } from "@/app/config/whatsapp";

export default function Footer() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
      console.log("Newsletter subscription:", email);
      setIsSubscribing(false);
      setEmail("");
      alert(t("footer.newsletter.successMessage"));
    }, 1000);
  };

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand & Description */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-wider">
              {t("footer.brand.name")}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("footer.brand.description")}
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61550335186337"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.links.title")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#destinations" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.destination")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link href="/#packages" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.package")}
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.testimonials")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.contact.title")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                <a href={`tel:${t("footer.contact.phone")}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.contact.phone")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                <a href={`mailto:${t("footer.contact.email")}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {t("footer.contact.email")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {t("footer.contact.address")}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.newsletter.title")}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t("footer.newsletter.description")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                placeholder={t("footer.newsletter.namePlaceholder")}
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-400 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.emailPlaceholder")}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-400 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium transition-colors disabled:opacity-50 text-sm"
              >
                {isSubscribing ? t("footer.newsletter.subscribing") : t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
