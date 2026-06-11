import Footer from "../../../../models/Footer";
import dbConnect from "../../../../../util/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid footer ID format" }, { status: 400 });
    }

    const footer = await Footer.findById(id);
    if (!footer) {
      return NextResponse.json({ error: "Footer not found" }, { status: 404 });
    }
    return NextResponse.json(footer, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid footer ID format" }, { status: 400 });
    }

    const body = await req.json();
    const footer = await Footer.findByIdAndUpdate(id, body, { new: true });

    if (!footer) {
      return NextResponse.json({ error: "Footer not found" }, { status: 404 });
    }
    return NextResponse.json(footer, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}