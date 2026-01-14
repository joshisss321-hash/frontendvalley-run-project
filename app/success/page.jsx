import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
