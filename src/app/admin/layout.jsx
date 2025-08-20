// src/app/admin/layout.jsx
"use client";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/contact">Contacts</Link>
          <Link href="/admin/donate">Donations</Link>
          <Link href="/admin/eligibility">Eligibility</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
