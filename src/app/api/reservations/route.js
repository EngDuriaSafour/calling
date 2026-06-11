import connectDB from "../../../../util/dbConnect";
import Reservation from "../../../models/Reservation";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); // Veritabanına bağlan
    const body = await req.json();
    const newReservation = await Reservation.create(body); // MongoDB'ye kaydet
    
    return NextResponse.json({ message: "Rezervasyon başarıyla kaydedildi!", data: newReservation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Veritabanı hatası" }, { status: 500 });
  }
}