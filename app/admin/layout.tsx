"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignOutAlt, FaMapMarkedAlt } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-serif font-bold text-white">
                Holiday Travel Adventure
              </h1>
              <span className="ml-3 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                ADMIN
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
                <Link
                  href="/admin/destinations"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <FaMapMarkedAlt className="w-4 h-4" />
                  <span>Destinations</span>
                </Link>

                <Link
                  href="/admin/packages"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <FaMapMarkedAlt className="w-4 h-4" />
                  <span>Packages</span>
                </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
