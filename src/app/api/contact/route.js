import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Contact.find({});
    return NextResponse.json(data); // ✅ Always return JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 }); // ✅ Safe fallback
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const contact = new Contact(body);
    await contact.save();
    return NextResponse.json({ message: "Contact saved!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
