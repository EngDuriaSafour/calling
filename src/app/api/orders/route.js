import { NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "../../../../util/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}