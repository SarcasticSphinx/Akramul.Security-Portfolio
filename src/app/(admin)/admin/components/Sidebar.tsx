"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { path: "/admin/YzIxNGRmN2U5MzY=/my-journey", label: "My Journey", icon: "📖" },
    { path: "/admin/YzIxNGRmN2U5MzY=/experiences", label: "Experiences", icon: "💼" },
    { path: "/admin/YzIxNGRmN2U5MzY=/services", label: "Services", icon: "🛠️" },
    { path: "/admin/YzIxNGRmN2U5MzY=/testimonials", label: "Testimonials", icon: "🌟" },
    { path: "/admin/YzIxNGRmN2U5MzY=/articles", label: "Articles", icon: "📝" },
    { path: "/admin/YzIxNGRmN2U5MzY=/contact", label: "Contact", icon: "✉️" },
  ];

  return (
    <aside className="min-w-72 min-h-screen  text-white p-4 shadow-lg">
      <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-blue-200 text-sm">Manage your content</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-white text-blue-800 font-medium"
                    : "text-white hover:bg-blue-600"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-blue-500">
        <div className="text-center text-blue-200 text-sm">
          <p>Admin Panel v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;