import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  persons: Number,
  date: String,
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);