"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/app/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const path = usePathname();

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsAuth(false);
      router.replace("/admin/login"); // 🔥 replace use karo
    } else {
      setIsAuth(true);
    }
  }, []);

  // 🔥 LOGIN PAGE BYPASS
  if (path === "/admin/login") {
    return children;
  }

  // 🔥 WAIT UNTIL CHECK COMPLETE
  if (isAuth === null) {
    return <div className="p-10">Checking auth...</div>;
  }

  // 🔥 BLOCK UNAUTHORIZED
  if (isAuth === false) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen p-8 bg-gray-100">
        {children}
      </div>
    </div>
  );
}