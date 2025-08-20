import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await connectDB(); // make sure DB is connected
    const body = await req.json();

    const newContact = await Contact.create(body);

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/contact error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
