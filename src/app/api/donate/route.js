// src/app/api/donate/route.js
import { connectDB } from "@/lib/mongodb";
import Donate from "@/models/Donate";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const donation = await Donate.create(body);
    return new Response(JSON.stringify(donation), { status: 201 });
  } catch (err) {
    return new Response("Error saving donation", { status: 500 });
  }
}
