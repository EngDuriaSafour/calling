import Product from "../../../../models/Product";
import dbConnect from "../../../../../util/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
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
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}