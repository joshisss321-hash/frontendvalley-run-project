"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Events", href: "/admin/events" },
    { name: "Submissions", href: "/admin/submissions" },
    { name: "Registrations", href: "/admin/registrations" },
    { name: "Leaderboard", href: "/admin/leaderboard" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-black to-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">ValleyRun 🚀</h2>

      {menu.map((m) => (
        <Link key={m.href} href={m.href}>
          <div
            className={`p-3 rounded-lg mb-2 transition ${
              path === m.href
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {m.name}
          </div>
        </Link>
      ))}
    </div>
  );
}