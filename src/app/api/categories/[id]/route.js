import { NextResponse } from "next/server";
import Category from "../../../../models/Category";
import dbConnect from "../../../../../util/dbConnect";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const category = await Category.findById(id);
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const category = await Category.findByIdAndDelete(id);
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}