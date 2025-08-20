// src/app/admin/contact/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => setContacts(Array.isArray(data) ? data : []))
      .catch(() => setContacts([]));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <tr key={c._id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 border text-center text-gray-500">
                No submissions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
