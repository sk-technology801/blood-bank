import dbConnect from "@/lib/mongodb";
import Donate from "@/models/Donate";
import { NextResponse } from "next/server";

// POST - Create donation entry
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newDonation = new Donate(body);
    await newDonation.save();

    return NextResponse.json({ success: true, data: newDonation }, { status: 201 });
  } catch (error) {
    console.error("POST /api/donate error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET - Fetch all donations
export async function GET() {
  try {
    await dbConnect();
    const donations = await Donate.find({});
    return NextResponse.json({ success: true, data: donations }, { status: 200 });
  } catch (error) {
    console.error("GET /api/donate error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
