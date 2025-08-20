// src/models/Eligibility.js
import mongoose from "mongoose";

const EligibilitySchema = new mongoose.Schema({
  name: String,
  age: Number,
  eligibility: String,
}, { timestamps: true });

export default mongoose.models.Eligibility || mongoose.model("Eligibility", EligibilitySchema);
