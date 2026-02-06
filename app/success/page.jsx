"use client";

import { Suspense } from "react";
import SuccessClient from "./successClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
