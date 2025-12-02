"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DestinationForm from "@/app/components/admin/DestinationForm";
import type { Destination } from "@/lib/supabase";

export default function EditDestinationPage() {
  const params = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`/api/destinations/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch destination");
      const data = await response.json();
      setDestination(data);
    } catch (err) {
      setError("Failed to load destination");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
        {error || "Destination not found"}
      </div>
    );
  }

  return <DestinationForm destination={destination} isEdit={true} />;
}
