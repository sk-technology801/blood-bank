// src/app/admin/donate/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("/api/donate")
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donations</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d._id}>
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.email}</td>
              <td className="p-2 border">${d.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
