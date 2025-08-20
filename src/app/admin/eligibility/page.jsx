"use client";
import React, { useEffect, useState } from "react";

export default function EligibilityPage() {
  const [eligibilityData, setEligibilityData] = useState([]);

  useEffect(() => {
    async function fetchEligibility() {
      try {
        const res = await fetch("/api/eligibility");
        const data = await res.json();
        setEligibilityData(Array.isArray(data) ? data : []); // ✅ ensure it's an array
      } catch (err) {
        console.error("Error fetching eligibility:", err);
        setEligibilityData([]);
      }
    }
    fetchEligibility();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Eligibility Data</h1>
      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Blood Type</th>
          </tr>
        </thead>
        <tbody>
          {eligibilityData.map((e) => (
            <tr key={e._id}>
              <td className="p-2 border">{e.name}</td>
              <td className="p-2 border">{e.age}</td>
              <td className="p-2 border">{e.bloodType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
