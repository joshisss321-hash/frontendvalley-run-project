"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Events", href: "/admin/events" },
    { name: "Leaderboard", href: "/admin/leaderboard" },
    { name: "Submissions", href: "/admin/submissions" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block p-2 rounded ${
                path === item.href
                  ? "bg-green-500 text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}