"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PackageForm from "@/app/components/admin/PackageForm";
import type { Package } from "@/lib/supabase";

export default function EditPackagePage() {
  const params = useParams();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch package");
        const data = await response.json();
        setPkg(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load package data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPackage();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl animate-pulse">Loading package data...</div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400 text-xl">{error || "Package not found"}</div>
      </div>
    );
  }

  return <PackageForm initialData={pkg} isEdit={true} />;
}
