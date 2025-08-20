// src/app/api/eligibility/route.js
import { connectDB } from "@/lib/mongodb";
import Eligibility from "@/models/Eligibility";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const eligibility = await Eligibility.create(body);
    return new Response(JSON.stringify(eligibility), { status: 201 });
  } catch (err) {
    return new Response("Error saving eligibility", { status: 500 });
  }
}
