"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Events", href: "/admin/events" },
    { name: "Leaderboard", href: "/admin/leaderboard" },
    { name: "Submissions", href: "/admin/submissions" },
  ];

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-5 fixed top-0 left-0 shadow-2xl">
      
      <h2 className="text-2xl font-bold mb-8 text-green-400">
        ⚡ Admin Panel
      </h2>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block p-3 rounded-lg transition-all duration-300 ${
                path === item.href
                  ? "bg-green-500 text-black shadow-lg"
                  : "hover:bg-white/10 hover:translate-x-1"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 🔥 LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="absolute bottom-6 left-5 right-5 bg-red-500 hover:bg-red-600 transition p-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}