import mongoose from "mongoose";

const DonateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bloodType: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Donate || mongoose.model("Donate", DonateSchema);
