"use client";

import { useState } from "react";
import { supabaseClient } from "@/utlis/SupabaseClient";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col justify-between p-5 fixed h-full">
      {/* Sidebar Top */}
      <div>
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              className={`block py-2 px-4 rounded ${
                pathname === "/admin/dashboard"
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
          </li>

          {/* Category Dropdown */}
          <li>
            <div
              role="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
            >
              <span>Category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 transition-transform ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 14.828l4.95-4.95a.75.75 0 011.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 011.06-1.06L12 14.828z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Dropdown Items */}
            {isCategoryOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/admin/category/add-category"
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Add Category
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/admin/settings"
              className={`block py-2 px-4 rounded ${
                pathname === "/admin/settings"
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button - Fixed at Bottom */}
      <div
        role="button"
        onClick={handleLogout}
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-600 cursor-pointer"
      >
        <div className="grid mr-3 place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span>Log Out</span>
      </div>
    </aside>
  );
}
