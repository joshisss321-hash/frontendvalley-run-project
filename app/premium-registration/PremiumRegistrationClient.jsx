"use client";

import { useSearchParams } from "next/navigation";

export default function PremiumRegistrationClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  return (
    <div className="pt-40 text-center">
      Premium Registration for {slug}
    </div>
  );
}
