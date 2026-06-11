import { NextResponse } from "next/server";
import Order from "../../../../models/Order";
import dbConnect from "../../../../../util/dbConnect";

export async function GET(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const order = await Order.findById(id);
    
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();
    
    const order = await Order.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const order = await Order.findByIdAndDelete(id);
    
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}