import { NextResponse } from "next/server";
import Category from "../../../models/Category";
import dbConnect from "../../../../util/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newCategory = await Category.create(body);
    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}