"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Destination } from "@/lib/supabase";

interface DestinationFormProps {
  destination?: Destination;
  isEdit?: boolean;
}

export default function DestinationForm({ destination, isEdit = false }: DestinationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name_en: destination?.name_en || "",
    name_ar: destination?.name_ar || "",
    days: destination?.days || "",
    nights: destination?.nights || "",
    people: destination?.people || "",
    price: destination?.price || "",
    image: destination?.image || "",
    active: destination?.active ?? true,
    display_order: destination?.display_order || 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit
        ? `/api/destinations/${destination?.id}`
        : "/api/destinations";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save destination");
      }

      router.push("/admin/destinations");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEdit ? "Edit Destination" : "Add New Destination"}
        </h1>
        <p className="text-gray-400">
          {isEdit
            ? "Update destination information"
            : "Add a new destination to your website"}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg border border-gray-800 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Name */}
          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-300 mb-2">
              Destination Name (English) *
            </label>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Bali, Indonesia"
            />
          </div>

          {/* Arabic Name */}
          <div>
            <label htmlFor="name_ar" className="block text-sm font-medium text-gray-300 mb-2">
              Destination Name (Arabic) *
            </label>
            <input
              type="text"
              id="name_ar"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., بالي، إندونيسيا"
              dir="rtl"
            />
          </div>

          {/* Days */}
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Days *
            </label>
            <input
              type="text"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 5"
            />
          </div>

          {/* Nights */}
          <div>
            <label htmlFor="nights" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Nights *
            </label>
            <input
              type="text"
              id="nights"
              name="nights"
              value={formData.nights}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 4"
            />
          </div>

          {/* People */}
          <div>
            <label htmlFor="people" className="block text-sm font-medium text-gray-300 mb-2">
              Number of People *
            </label>
            <input
              type="text"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 2 - 4"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
              Price (USD) *
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 1,299"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Image URL *
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., /images/destinations/bali.jpg"
            />
            <p className="text-gray-500 text-sm mt-2">
              Upload your image to /public/images/destinations/ and enter the path here
            </p>
          </div>

          {/* Display Order */}
          <div>
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-300 mb-2">
              Display Order
            </label>
            <input
              type="number"
              id="display_order"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0"
            />
            <p className="text-gray-500 text-sm mt-2">
              Lower numbers appear first
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-5 h-5 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
            />
            <label htmlFor="active" className="ml-3 text-sm font-medium text-gray-300">
              Active (visible on website)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Saving..." : isEdit ? "Update Destination" : "Add Destination"}
          </button>
          <Link
            href="/admin/destinations"
            className="px-8 py-3 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
