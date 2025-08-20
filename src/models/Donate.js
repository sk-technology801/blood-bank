// src/models/Donate.js
import mongoose from "mongoose";

const DonateSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: Number,
}, { timestamps: true });

export default mongoose.models.Donate || mongoose.model("Donate", DonateSchema);
