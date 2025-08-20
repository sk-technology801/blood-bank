import dbConnect from "@/lib/mongodb";
import Eligibility from "@/models/Eligibility";

export async function GET() {
  try {
    await dbConnect();
    const data = await Eligibility.find({});
    return Response.json(data, { status: 200 }); // ✅ Always return an array
  } catch (error) {
    console.error("Error fetching eligibility data:", error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
