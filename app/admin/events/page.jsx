"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import AdminEvents from "./AdminEvents";

export default function Page() {
  return <AdminEvents />;
}
