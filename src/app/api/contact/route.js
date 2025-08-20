// src/app/api/contact/route.js
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newContact = await Contact.create(body);
    return new Response(JSON.stringify(newContact), { status: 201 });
  } catch (err) {
    return new Response("Error saving contact", { status: 500 });
  }
}
