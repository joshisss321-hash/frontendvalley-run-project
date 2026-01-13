"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import PremiumRegistrationClient from "./PremiumRegistrationClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading...</div>}>
      <PremiumRegistrationClient />
    </Suspense>
  );
}
