"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/admin/_components/Sidebar";
import Navbar from "@/app/admin/_components/Navbar";
import { supabaseClient } from "@/utlis/SupabaseClient";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: session } = await supabaseClient.auth.getSession();
      if (!session.session) {
        router.push("/admin/login");
      } else {
        setUser(session.session.user);
      }
    }
    checkUser();
  }, []);

  if (!user) return <h1 className="text-center mt-20 text-xl">Loading...</h1>;

  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar - Fixed */}
        <Toaster position="top-center" />
        <Sidebar />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-h-screen ml-64">
          <Navbar />
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
