import { NextResponse } from "next/server";
import dbConnect from "../../../../util/dbConnect";
import User from "../../../models/User";

export async function GET(request) {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}